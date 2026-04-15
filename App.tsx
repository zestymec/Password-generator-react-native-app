import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'

import { Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { SafeAreaView } from 'react-native-safe-area-context'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .typeError('Only Numbers Allowed') 
    .required('Length is required')     
    .min(6, 'Minimum 6 characters')    
    .max(100, 'Too long!')            
})

export default function App() {
  const [password, setPassword] = useState('')
  const [ispassgenerated, setIspassgenerated] = useState(false)
  const [lowercase, setlowercase] = useState(true)
  const [Uppercase, setUppercase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatepasswordString = (passwordlength: number) => {
    let characterlist = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (Uppercase) characterlist += upperCaseChars;
    if (lowercase) characterlist += lowerCaseChars;
    if (numbers) characterlist += digitChars;
    if (symbols) characterlist += specialChars;

    const passwordResult = createPasswords(characterlist, passwordlength)
    setPassword(passwordResult)
    setIspassgenerated(true)
  }

  const createPasswords = (chracters: string, passwordlength: number) => {
    let result = ''
    for (let i = 0; i < passwordlength; i++) {
      const chracterIndex = Math.floor(Math.random() * chracters.length)
      result += chracters.charAt(chracterIndex)
    }
    return result
  }

  const resetPasswords = () => {
    setPassword('')
    setIspassgenerated(false)
    setNumbers(false)
    setlowercase(true)
    setUppercase(false)
    setSymbols(false)
  }

  return (<SafeAreaView style={styles.appContainer}>
    <ImageBackground 
      source={{ uri: 'https://images.pexels.com/photos/1635439/pexels-photo-1635439.jpeg' }} 
      style={styles.bgImage}
    >
      
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Password Generator</Text>
            
            <Formik
              initialValues={{ passwordLength: '' }}
              validationSchema={passwordSchema}
              onSubmit={values => {
                generatepasswordString(+values.passwordLength)
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                isValid,
                handleSubmit,
                handleReset,
              }) => (
                <>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputColumn}>
                      <Text style={styles.heading}>Password Length</Text>
                      {touched.passwordLength && errors.passwordLength && (
                        <Text style={styles.errorText}>{errors.passwordLength}</Text>
                      )}
                    </View>
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Ex. 6-100"
                      placeholderTextColor="#ccc"
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Include LowerCase</Text>
                    <BouncyCheckbox
                    useBuiltInState={false}
                      isChecked={lowercase}
                      onPress={() => setlowercase(!lowercase)}
                      fillColor='green'
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Include UppperCase</Text>
                    <BouncyCheckbox
                     useBuiltInState={false}
                      isChecked={Uppercase}
                      onPress={() => setUppercase(!Uppercase)}
                      fillColor='red'
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Include Numbers</Text>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor='brown'
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Include Symbols</Text>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor='orange'
                    />
                  </View>

                  <View style={styles.formActions}>
                    <TouchableOpacity 
                      disabled={!isValid} 
                      style={[styles.primaryBtn, !isValid && {backgroundColor: '#7f8c8d'}]} 
                      onPress={handleSubmit}
                    >
                      <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.secondaryBtn} 
                      onPress={() => {
                        handleReset();
                        resetPasswords();
                      }}
                    >
                      <Text style={styles.secondaryBtnTxt}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>

          {ispassgenerated ? (
            <View style={[styles.card, styles.cardElevated]}>
              <Text style={styles.subTitle}>Result:</Text>
              <Text style={styles.description}>long press to Copy</Text>
              <Text style={styles.generatedPassword} selectable={true}>
                {password}
              </Text>
            </View>
          ) : null}
        </ScrollView>
    </ImageBackground>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%', 
    height: '100%', 
    justifyContent: 'center', 
   
  },
  appContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  formContainer: {
    margin: 16,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center'
  },
  heading: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600'
  },
  label: {
    color: '#fff',
    fontSize: 15
  },
  inputWrapper: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
    flex: 1
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#fff',
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  errorText: {
    fontSize: 12,
    color: '#ff4d4d',
    marginTop: 4
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20
  },
  primaryBtn: {
    width: 150,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    margin: 16,
    backgroundColor: '#fff',
  },
  cardElevated: {
    elevation: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  description: {
    color: '#758283',
    marginBottom: 10,
  },
  generatedPassword: {
    fontSize: 20,
    textAlign: 'center',
    color: '#2c3e50',
    fontWeight: 'bold'
  },
});