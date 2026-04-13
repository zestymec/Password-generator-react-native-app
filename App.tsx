import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Yup from 'yup'
const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number().min(2, 'should be min 2').max(8, 'should be less than 8').required('length is required')
})

export default function App() {

  return (
    <View>
      <Text>App lore

      </Text>
    </View>
  )
}

const styles = StyleSheet.create({})