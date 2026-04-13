import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number().min(2, 'should be min 2').max(8, 'should be less than 8').required('length is required')
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


    if (Uppercase) {
      characterlist += upperCaseChars;
    }
    if (lowercase) {
      characterlist += lowerCaseChars;
    }
    if (numbers) {
      characterlist += digitChars;
    }
    if (symbols) {
      characterlist += specialChars;
    }

    const passwordResult = createPasswords(characterlist, passwordlength)
    setPassword(passwordResult)
    setIspassgenerated(true)
  }

  const createPasswords = (chracters: string, passwordlength: number) => {
    let result = ''
    for (let i = 0; i < passwordlength; i++) {

      const chracterIndex = Math.round(Math.random() * chracters.length)
      result += chracters.charAt(chracterIndex)
    }
    return result
  }

  const resetPasswords = () => {
    setPassword('')
    setIspassgenerated(false)
    setNumbers(false)
    setlowercase(true)
    setSymbols(false)
    setlowercase(true)

  }

  return (
    <View>
      <Text style={styles.heading}>
        Lahore Lahore ay !
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    margin: 'auto',
    fontWeight: 'bold',
    fontSize: 45,
    paddingVertical: 22,
  }
})