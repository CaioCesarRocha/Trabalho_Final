import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik'
import * as Yup from 'yup';
import Input from '../components/input';
import ValidationForm from '../components/ValidationForm';
import LoadingModal from '../components/Loading';
import ComponentHeader from '../components/Header';

import { db, fb_init } from '../../firebaseConfig';

export default function UserRegister({ navigation }) {

    const initialValues = {
        nome: '',
        cidade: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    }

    const validationSchema = Yup.object().shape({
        nome: Yup.string()
            .matches(/^[A-Za-z ]*$/, 'Use apenas letras')
            .max(150, 'Limite de caracteres excedido (150).')
            .required('O campo Nome é obrigatório'),
        cidade: Yup.string()
            .matches(/^[A-Za-z ]*$/, 'Use apenas letras')
            .max(100, 'Limite de caracteres excedido (100).')
            .required('O campo Cidade é obrigatório'),
        email: Yup.string()
            .email('O e-mail inserido é inválido')
            .required('O campo E-mail é obrigatório'),
        senha: Yup.string()
            .matches(
                /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "A senha deve ter pelo menos 6 caracteres, uma letra maiúscula, um número, e um caracter especial."
              )
            .required('O campo Senha é obrigatório'),
        confirmarSenha: Yup.string()
            .matches(
                /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "A senha deve ter pelo menos 6 caracteres, uma letra maiúscula, um número, e um caracter especial."
            )
            .oneOf([Yup.ref('senha'), null], 'A senha confirmada deve ser igual a anterior.')
            .required('O campo Confirmação de senha é obrigatório'),
    })

    const [loading, setLoading] = useState(false);

    const SuccessAlert = (data) => {
        Alert.alert(
            data.title,
            data.message,
            [
              { text: "OK", onPress: () => navigation.navigate('Login', { name: 'Login' }) }
            ]
          );
    }

    const ErrorAlert = (data) => {
        Alert.alert(
            data.title,
            data.message,
            [
              { text: "OK", onPress: () => null }
            ]
          );
    }

    const registerForm = async (data, reset) => {
        setLoading(true)
        try {
            const userCredential = await fb_init.auth().createUserWithEmailAndPassword(data.email, data.senha)
            await db.collection("usuarios").doc(userCredential.uid).set({
                nome: data.nome,
                cidade: data.cidade
            })
            reset({ initialValues })
            setLoading(false)
            SuccessAlert({ title: "Cadastro concluído!", message: "Seu cadastro foi realizado. Redirecionando para o Login."})    
        }
        catch(error) {
            setLoading(false)
            if(error.code === "auth/email-already-in-use")
                ErrorAlert({ title: "Erro!", message: "Email já utilizado."})    
            else 
                ErrorAlert({ title: "Erro!", message: "Erro ao tentar realizar o seu cadastro."})    
            console.log(error)
        }
    }

    return (
        <View>
            <LoadingModal modalVisible={loading} />
            <ComponentHeader title="Cadastro de Usuário" navigation={navigation} />
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => registerForm(values, resetForm)}
            >
                {({ values, handleChange, errors, touched, handleSubmit }) => (
                    <View style={styles.formContainer}>
                        <Input
                            tipoTeclado="default"
                            label="Nome:"
                            placeholder="Insira o Nome"
                            value={values.nome}
                            action={handleChange('nome')}
                        />
                        {errors.nome && touched.nome &&
                            <ValidationForm message={errors.nome} />
                        }
                        <Input
                            tipoTeclado="default"
                            label="Cidade:"
                            placeholder="Insira a Cidade"
                            value={values.cidade}
                            action={handleChange('cidade')}
                        />
                        {errors.cidade && touched.cidade &&
                            <ValidationForm message={errors.cidade} />
                        }
                        <Input
                            tipoTeclado="default"
                            label="E-mail:"
                            placeholder="Insira o E-mail"
                            value={values.email}
                            action={handleChange('email')}
                        />
                        {errors.email && touched.email &&
                            <ValidationForm message={errors.email} />
                        }
                        <View style={styles.containerSenha}>
                            <Input 
                                tipoTeclado="default"
                                placeholder="Insira a Senha"
                                label="Senha:"
                                value={values.senha}
                                action={handleChange('senha')}
                                security={true}
                            />
                        </View>
                        {errors.senha && touched.senha &&
                            <ValidationForm message={errors.senha} />
                        }
                        <View style={styles.containerSenha}>
                            <Input 
                                tipoTeclado="default"
                                placeholder=" Confirme a Senha"
                                label="Confirmação de Senha:"
                                value={values.confirmarSenha}
                                action={handleChange('confirmarSenha')}
                                security={true}
                            />
                        </View>
                        {errors.confirmarSenha && touched.confirmarSenha &&
                            <ValidationForm message={errors.confirmarSenha} />
                        }
                        <View style={styles.containerBTN}>
                            <TouchableOpacity
                                className="btnn" 
                                style={styles.btn}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.textoBtn}> Finalizar Cadastro </Text>                
                            </TouchableOpacity>
                        </View>   
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({ 
    containerSenha: {
        minWidth: 200,
        marginTop: 10
    },
    formContainer: {
        padding: 20,
        margin: 10,
        paddingTop: 0
    },
    containerBTN:{
        alignItems: 'center',
        justifyContent: 'center',
        ':hover':{
            backgroundColor: '#fff',
        }
    },
    btn:{
        padding: 10,
        backgroundColor: '#751aff',
        width: 250,
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
        ':hover':{
            backgroundColor: '#fff',
        }
    },



    textoBtn:{
        color: '#FFF',
        fontWeight: 'bold'
    }, 
});