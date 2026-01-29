import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Modal,
  FlatList,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp, FadeInLeft } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../api/services/appointment.service';
import { Appointment } from '../api/mock/data';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { doctors, Doctor } from '../data/doctors';
import * as Haptics from 'expo-haptics';
import SearchBar from '../components/ui/SearchBar';

const { width } = Dimensions.get('window');

const AppointmentAndEvents = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    email: user?.email || '',
    date: '',
    time: '',
    doctorName: '',
    message: '',
  });

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch {
      showToast('Failed to fetch appointments', 'error');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAppointments();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.email || !formData.doctorName || !formData.date || !formData.time) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await updateAppointment(editingId, formData);
        showToast('Appointment updated successfully!', 'success');
      } else {
        await createAppointment({
          ...formData,
          patientId: user?.id || 'guest',
          patientName: formData.name,
          doctorId: 'mock-id',
        });
        showToast('Appointment scheduled successfully!', 'success');
      }

      setFormData({
        name: user?.name || '',
        phone: '',
        email: user?.email || '',
        date: '',
        time: '',
        doctorName: '',
        message: '',
      });
      setSelectedDate(null);
      setEditingId(null);
      fetchAppointments();
    } catch (error) {
      if (error instanceof Error && error.message.includes('Offline')) {
        showToast('You are offline. Action queued for sync.', 'info');
        // Clear form anyway to show it's "processed"
        setFormData({
          name: user?.name || '',
          phone: '',
          email: user?.email || '',
          date: '',
          time: '',
          doctorName: '',
          message: '',
        });
        setSelectedDate(null);
        setEditingId(null);
        fetchAppointments();
      } else {
        showToast('Failed to save appointment', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (appt: Appointment) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setEditingId(appt.id);
    setFormData({
      name: appt.patientName,
      phone: appt.phone,
      email: appt.email,
      date: appt.date,
      time: appt.time,
      doctorName: appt.doctorName,
      message: appt.message,
    });
    setSelectedDate(new Date(appt.date));
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Appointment',
      'Are you sure you want to delete this appointment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await deleteAppointment(id);
              showToast('Appointment deleted', 'success');
              fetchAppointments();
            } catch {
              showToast('Failed to delete appointment', 'error');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2563eb']} />
        }
      >
        <View style={styles.content}>
          {/* Form Section */}
          <Animated.View entering={FadeInUp.duration(800).springify()} style={styles.formSection}>
            <Animated.Text entering={FadeInLeft.delay(200)} style={styles.formTitle}>
              {editingId ? 'Edit Appointment' : 'Appointment Form'}
            </Animated.Text>
            <Animated.Text entering={FadeInLeft.delay(300)} style={styles.formSubtitle}>
              {editingId
                ? 'Update your appointment details'
                : 'Book your appointment - response within 30 minutes'}
            </Animated.Text>

            <View style={styles.form}>
              <Animated.View entering={FadeInDown.delay(400)}>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name*"
                  value={formData.name}
                  onChangeText={name => setFormData({ ...formData, name })}
                />
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(500)}>
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number*"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={phone => setFormData({ ...formData, phone })}
                />
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(600)}>
                <TextInput
                  style={styles.input}
                  placeholder="Email Address*"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={email => setFormData({ ...formData, email })}
                />
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(700)}>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <TouchableOpacity
                    style={[styles.input, { flex: 1 }]}
                    onPress={() => setShowDatePicker(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={{ color: formData.date ? '#1e293b' : '#999' }}>
                      {formData.date || ' Date*'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.input, { flex: 1 }]}
                    onPress={() => setShowTimePicker(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={{ color: formData.time ? '#1e293b' : '#999' }}>
                      {formData.time || ' Time*'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(800)}>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowDoctorModal(true)}
                  activeOpacity={0.7}
                >
                  <Text style={{ color: formData.doctorName ? '#1e293b' : '#999' }}>
                    {formData.doctorName || 'Select Doctor*'}
                  </Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(900)}>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  placeholder="Message*"
                  multiline
                  value={formData.message}
                  onChangeText={message => setFormData({ ...formData, message })}
                />
              </Animated.View>

              <Animated.View entering={FadeInUp.delay(1000)}>
                <TouchableOpacity
                  style={[styles.submitButton, loading && { opacity: 0.7 }]}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    handleSubmit();
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.submitButtonText}>
                      {editingId ? 'Update Appointment' : 'Schedule Appointment'}
                    </Text>
                  )}
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Animated.View>

          {/* Appointment List */}
          <View style={styles.listSection}>
            <Text style={styles.listTitle}>My Appointments</Text>

            {appointments.length === 0 ? (
              <Animated.View
                entering={FadeInDown.delay(200)}
                style={styles.emptyStateContainer}
              >
                <MaterialCommunityIcons name="calendar-blank-outline" size={80} color="#cbd5e1" />
                <Text style={styles.emptyStateTitle}>No Appointments Yet</Text>
                <Text style={styles.emptyStateText}>
                  Your scheduled appointments will appear here. Book one above to get started!
                </Text>
              </Animated.View>
            ) : (
              appointments.map((appt, index) => (
                <Animated.View
                  key={appt.id}
                  entering={FadeInDown.delay(index * 100)}
                  style={styles.apptCard}
                >
                  <View style={styles.apptInfo}>
                    <Text style={styles.apptDoctor}>{appt.doctorName}</Text>
                    <Text style={styles.apptDate}>
                      {appt.date} • {appt.time}
                    </Text>
                    <Text style={[styles.statusBadge, styles[appt.status]]}>
                      {appt.status.toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.apptActions}>
                    <TouchableOpacity onPress={() => handleEdit(appt)} style={styles.actionBtn}>
                      <MaterialCommunityIcons name="pencil" size={25} color="#2563eb" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        handleDelete(appt.id);
                      }}
                      style={styles.actionBtn}
                    >
                      <MaterialCommunityIcons name="trash-can-outline" size={30} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="calendar"
          minimumDate={new Date()}
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) {
              setSelectedDate(date);
              setFormData(prev => ({
                ...prev,
                date: date.toISOString().split('T')[0],
              }));
            }
          }}
        />
      )}

      {/* Time Picker Modal */}
      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={(event, date) => {
            setShowTimePicker(false);
            if (date) {
              const hours = date.getHours();
              const minutes = date.getMinutes();
              const ampm = hours >= 12 ? 'PM' : 'AM';
              const formattedHours = hours % 12 || 12;
              const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
              const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;

              setFormData(prev => ({
                ...prev,
                time: timeString,
              }));
            }
          }}
        />
      )}

      {/* Doctor Selection Modal */}
      <Modal
        visible={showDoctorModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDoctorModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose a Doctor</Text>
              <TouchableOpacity onPress={() => setShowDoctorModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 16 }}>
              <SearchBar
                placeholder="Search doctors..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <FlatList
              data={doctors.filter(d =>
                d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.specialization.toLowerCase().includes(searchQuery.toLowerCase())
              )}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.doctorItem}
                  onPress={() => {
                    setFormData({ ...formData, doctorName: item.name });
                    setShowDoctorModal(false);
                    setSearchQuery('');
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                >
                  <View style={styles.doctorIcon}>
                    <MaterialCommunityIcons name="doctor" size={24} color="#2563eb" />
                  </View>
                  <View>
                    <Text style={styles.doctorItemName}>{item.name}</Text>
                    <Text style={styles.doctorItemSpec}>{item.specialization}</Text>
                  </View>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <View style={{ alignItems: 'center', padding: 20 }}>
                  <Text style={{ color: '#64748b' }}>No doctors found</Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  content: { padding: 16, gap: 24 },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    elevation: 3,
  },
  formTitle: { fontSize: 24, fontWeight: '700', color: '#1e3a8a' },
  formSubtitle: { color: '#64748b', marginBottom: 16 },
  form: { gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#f8fafc',
  },
  textarea: { minHeight: 100 },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontWeight: '600' },
  listSection: {},
  listTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  apptCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  apptInfo: { flex: 1 },
  apptDoctor: { fontWeight: '600' },
  apptDate: { color: '#64748b', marginVertical: 4 },
  statusBadge: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  pending: { backgroundColor: '#fef3c7', color: '#d97706' },
  confirmed: { backgroundColor: '#d1fae5', color: '#059669' },
  cancelled: { backgroundColor: '#fee2e2', color: '#dc2626' },
  completed: { backgroundColor: '#e0e7ff', color: '#4f46e5' },
  apptActions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#475569',
    marginTop: 16,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginTop: 8,
    lineHeight: 20,
  },
  noData: { textAlign: 'center', color: '#64748b' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: '80%',
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e3a8a',
  },
  doctorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    marginBottom: 12,
    gap: 16,
  },
  doctorIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  doctorItemSpec: {
    fontSize: 14,
    color: '#64748b',
  },
});

export default AppointmentAndEvents;
