import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native';

const { width } = Dimensions.get('window');

const events = [
  {
    id: '1',
    date: '17-03-2026',
    title: 'Umbergaon Taluka Medico Club',
    description: 'Medical professionals gathering for knowledge exchange & networking',
    image: require('../../assets/images/event1.jpg'),
  },
  {
    id: '2',
    date: '10-03-2026',
    title: "Ankleshwar DOCTOR'S Club Cricket Tournament",
    description: 'Annual cricket tournament for doctors',
    image: require('../../assets/images/event2.jpg'),
  },
  {
    id: '3',
    date: '09-03-2026',
    title: 'Senior Citizen Camp',
    description: 'Free health checkup camp for senior citizens',
    image: require('../../assets/images/event3.jpg'),
  },
];



const AppointmentAndEvents = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    doctor: '',
    message: '',
  });

  const formOpacity = useRef(new Animated.Value(0)).current;
  const eventsOpacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(formOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(eventsOpacity, {
      toValue: 1,
      duration: 700,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please fill all required fields');
      return;
    }
    alert('Appointment request submitted! We will contact you within 30 minutes.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      doctor: '',
      message: '',
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Appointment Form */}
          <Animated.View
            style={[
              styles.formSection,
              {
                opacity: formOpacity,
              },
            ]}
          >
            <Text style={styles.formTitle}>Appointment Form</Text>
            <Text style={styles.formSubtitle}>
              Book your appointment - response within 30 minutes
            </Text>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Full Name*"
                placeholderTextColor="#999"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number*"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) =>
                  setFormData({ ...formData, phone: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address*"
                placeholderTextColor="#999"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Appointment Date"
                placeholderTextColor="#999"
                value={formData.date}
                onChangeText={(text) =>
                  setFormData({ ...formData, date: text })
                }
              />

              <View style={styles.selectContainer}>
                <Text style={styles.selectLabel}>Select Doctor</Text>
                <Text style={styles.selectOptions}>
                  Dr. Rajiv Pandya | Dr. Ankur Chaudhari | Dr. Nainesh Patel
                </Text>
              </View>

              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Message*"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={formData.message}
                onChangeText={(text) =>
                  setFormData({ ...formData, message: text })
                }
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>📅 Schedule Appointment</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e8f0',
  },
  content: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 24,
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  form: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  textarea: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fafafa',
  },
  selectLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  selectOptions: {
    fontSize: 13,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
 
  upcomingTag: {
    backgroundColor: '#d1fae5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  upcomingTagText: {
    color: '#047857',
    fontWeight: '600',
    fontSize: 12,
  },
});

export default AppointmentAndEvents;
