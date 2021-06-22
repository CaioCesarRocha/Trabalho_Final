import React, { useEffect,useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LoadingModal from '../components/Loading';
import Input from '../components/Input';
import ComponentHeader from '../components/Header';
import ComponentPicker from '../components/Picker';
import ComponentSlider from '../components/Slider';
import ValidationForm from '../components/ValidationForm';

import { db } from '../../firebaseConfig';

export default function PlayersRegister({ navigation }) {

const InitialValues = {
  nome: '',
  idade: '',
  nacionalidade: '',
  clube: '',
  posicao: '',
  salario: 0
}

const validationSchema = Yup.object().shape({
  nome: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Use apenas letras')
    .max(150, 'Limite de caracteres excedido (150).')
    .required('O nome é obrigatório'),
  idade: Yup.number()
    .typeError('Use apenas números')
    .positive('Use apenas números positivos')
    .integer('Use apenas números inteiros')
    .required('O campo idade é obrigatório'),
  nacionalidade: Yup.string()
    .required('O campo nacionalidade é obrigatório')
    .max(200, 'Limite de caracteres excedido (200).')
    .matches(/^[A-Za-z ]*$/, 'Use apenas letras'),
  clube: Yup.string()
    .required('O campo Nome do Clube é obrigatório')
    .max(150, 'Limite de caracteres excedido (150).'),
  posicao: Yup.string()
    .required('A escolha de uma posicao é obrigatória'),
  salario: Yup.number()
    .required('A informação do salário é obrigatória'),
})

  const [posicoes, setPosicoes] = useState([
    { id: 1, descricao: "Atacante" },
    { id: 2, descricao: "Meio Campo" },
    { id: 3, descricao: "Lateral" },
    { id: 4, descricao: "Zagueiro" },
    { id: 5, descricao: "Goleiro" },
  ])

  const SuccessAlert = (data) => {
    Alert.alert(
        data.title,
        data.message,
        [
          { text: "OK", onPress: () => navigation.navigate('ListPlayers', { name: 'ListPlayers' }) }
        ]
      );
  }

  const [loading, setLoading] = useState(false)

  const SendPlayersForm = async (data, reset) => {
    setLoading(true)
    try {
      await db.collection("Jogadores").add({
        nome: data.nome,
        idade: data.idade,
        nacionalidade: data.nacionalidade,
        clube: data.clube,
        posicao: data.posicao,
        salario: data.salario,
      })
      reset({ InitialValues })
      setLoading(false)
      SuccessAlert({ title: "Cadastro concluído!", message: "Jogador cadastrado com sucesso!."})
    }
    catch (error) {
      setLoading(false)
      console.log(error)
    } 
  }


  return (
    <SafeAreaView style={styles.container}>
      <LoadingModal modalVisible={loading} />
      <ScrollView>
        <ComponentHeader title={"Cadastrar Jogador"} navigation={navigation} />                  
        <View style={styles.body}>
          <Formik
            validationSchema={validationSchema}
            initialValues={InitialValues}
            onSubmit={(values, { resetForm }) => SendPlayersForm(values, resetForm)}
          >
            {({ values, handleChange, errors, setFieldValue, touched, handleSubmit }) => (
              <React.Fragment>
                <Text style={styles.formInfo}>Preencha as informações: </Text>
                <Input
                  label="Nome:"
                  placeholder="Digite o nome do Jogador"
                  action={handleChange('nome')}
                  value={values.nome}
                  tipoTeclado={"default"}
                />
                {errors.nome && touched.nome &&
                  <ValidationForm message={errors.nome} />
                }
                <Input
                  label="Idade:"
                  placeholder="Digite a idade do Jogador"
                  action={handleChange('idade')}
                  value={values.idade}
                  tipoTeclado={"numeric"}
                />
                {errors.idade && touched.idade &&
                  <ValidationForm message={errors.idade} />
                }
                <Input
                  label="Nacionalidade:"
                  placeholder="Digite a nacionalidade do Jogador"
                  action={handleChange('nacionalidade')}
                  value={values.nacionalidade}
                  tipoTeclado={"default"}
                />
                {errors.nacionalidade && touched.nacionalidade &&
                  <ValidationForm message={errors.nacionalidade} />
                }
                <Input
                  label="Clube:"
                  placeholder="Nome do Clube referente ao Jogador"
                  action={handleChange('clube')}
                  value={values.clube}
                  tipoTeclado={"default"}
                />
                {errors.clube && touched.clube &&
                  <ValidationForm message={errors.clube} />
                }
                <ComponentPicker
                  label="Posição:"
                  valorSelecionado={values.posicao}
                  listaItens={posicoes}
                  action={setFieldValue}
                  field='posicao'
                />
                {errors.posicao && touched.posicao &&
                  <ValidationForm message={errors.posicao} />
                }
                <ComponentSlider
                  titulo="Informe o salário"
                  valorMin={0}
                  valorMax={1000000}
                  action={setFieldValue}
                  field='salario'
                  valorSlider={`R$ ${values.salario}`}
                />
                {errors.salario && touched.salario &&
                  <ValidationForm message={errors.salario} />
                }

                <View style={styles.containerBTN}>
                  <TouchableOpacity 
                    style={styles.btn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.textoBtn}> Finalizar Cadastro </Text>                
                  </TouchableOpacity>
                </View>                
              </React.Fragment>
            )}
          </Formik>
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  body: {
    padding: 20
  },
  formInfo: {
    fontSize: 16,
    marginBottom: 10,
    color: '#751aff', 
    fontWeight: 'bold'
  },
  containerBTN:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn:{
    padding: 10,
    backgroundColor: '#751aff',
    width: 250,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30
  },
  textoBtn:{
    color: '#FFF',
    fontWeight: 'bold'
  },


})