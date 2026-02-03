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
import { useRoute } from '@react-navigation/native';

import { wp, hp, moderateScale } from '../utils/responsive';

const AppointmentAndEvents = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const route = useRoute<any>();

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

  useEffect(() => {
    if (route.params) {
      const { doctor, selectedDate: passedDate, selectedTime } = route.params;
      if (doctor || passedDate || selectedTime) {
        setFormData(prev => ({
          ...prev,
          doctorName: doctor || prev.doctorName,
          date: passedDate?.fullDate || prev.date,
          time: selectedTime || prev.time,
        }));
        if (passedDate?.fullDate) {
          setSelectedDate(new Date(passedDate.fullDate));
        }
      }
    }
  }, [route.params]);

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
                <View style={{ flexDirection: 'row', gap: wp(3) }}>
                  <TouchableOpacity
                    style={[styles.input, { flex: 1 }]}
                    onPress={() => setShowDatePicker(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={{ color: formData.date ? '#1e293b' : '#999', fontSize: moderateScale(14) }}>
                      {formData.date || ' Date*'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.input, { flex: 1 }]}
                    onPress={() => setShowTimePicker(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={{ color: formData.time ? '#1e293b' : '#999', fontSize: moderateScale(14) }}>
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
                  <Text style={{ color: formData.doctorName ? '#1e293b' : '#999', fontSize: moderateScale(14) }}>
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
                <MaterialCommunityIcons name="calendar-blank-outline" size={wp(20)} color="#cbd5e1" />
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
                    <Text style={[styles.statusBadge, (styles as any)[appt.status]]}>
                      {appt.status.toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.apptActions}>
                    <TouchableOpacity onPress={() => handleEdit(appt)} style={styles.actionBtn}>
                      <MaterialCommunityIcons name="pencil" size={wp(6)} color="#2563eb" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        handleDelete(appt.id);
                      }}
                      style={styles.actionBtn}
                    >
                      <MaterialCommunityIcons name="trash-can-outline" size={wp(7)} color="#ef4444" />
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

            <View style={{ marginBottom: hp(2) }}>
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
                <View style={{ alignItems: 'center', padding: wp(5) }}>
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
  content: { padding: wp(4), gap: hp(3) },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: wp(6),
    padding: wp(5),
    elevation: 3,
  },
  formTitle: { fontSize: moderateScale(24), fontWeight: '700', color: '#1e3a8a' },
  formSubtitle: { color: '#64748b', marginBottom: hp(2), fontSize: moderateScale(14) },
  form: { gap: hp(1.5) },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: wp(3),
    padding: wp(3.5),
    backgroundColor: '#f8fafc',
    fontSize: moderateScale(14),
  },
  textarea: { minHeight: hp(12) },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: wp(3.5),
    borderRadius: wp(3),
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontWeight: '600', fontSize: moderateScale(16) },
  listSection: {},
  listTitle: { fontSize: moderateScale(20), fontWeight: '700', marginBottom: hp(2) },
  apptCard: {
    backgroundColor: '#fff',
    borderRadius: wp(4),
    padding: wp(4),
    marginBottom: hp(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  apptInfo: { flex: 1 },
  apptDoctor: { fontWeight: '600', fontSize: moderateScale(16) },
  apptDate: { color: '#64748b', marginVertical: hp(0.5), fontSize: moderateScale(14) },
  statusBadge: {
    fontSize: moderateScale(10),
    fontWeight: '700',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: wp(2.5),
    alignSelf: 'flex-start',
  },
  pending: { backgroundColor: '#fef3c7', color: '#d97706' },
  confirmed: { backgroundColor: '#d1fae5', color: '#059669' },
  cancelled: { backgroundColor: '#fee2e2', color: '#dc2626' },
  completed: { backgroundColor: '#e0e7ff', color: '#4f46e5' },
  apptActions: { flexDirection: 'row', gap: wp(2) },
  actionBtn: {
    padding: wp(3.5),
    backgroundColor: '#f8fafc',
    borderRadius: wp(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(5),
    backgroundColor: '#fff',
    borderRadius: wp(6),
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
  },
  emptyStateTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#475569',
    marginTop: hp(2),
  },
  emptyStateText: {
    fontSize: moderateScale(14),
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: wp(10),
    marginTop: hp(1),
    lineHeight: moderateScale(20),
  },
  noData: { textAlign: 'center', color: '#64748b' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    height: '80%',
    padding: wp(6),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2.5),
  },
  modalTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#1e3a8a',
  },
  doctorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    borderRadius: wp(4),
    backgroundColor: '#f8fafc',
    marginBottom: hp(1.5),
    gap: wp(4),
  },
  doctorIcon: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorItemName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#1e293b',
  },
  doctorItemSpec: {
    fontSize: moderateScale(14),
    color: '#64748b',
  },
});

export default AppointmentAndEvents;
