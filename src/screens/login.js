import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { Formik } from 'formik'
import * as Yup from 'yup';
import LoadingModal from '../components/Loading';
import Input from '../components/input';
import ValidationForm from '../components/ValidationForm';
import ComponentHeader from '../components/Header';

import { fb_init } from '../../firebaseConfig';

export default function Login({ navigation }) {

    const [loading, setLoading] = useState(false);

    const initialValues = {
        email: '',
        senha: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('O campo e-mail é obrigatório'),
        senha: Yup.string()
            .min(6, 'A senha deve ter pelo menos 6 caracteres')         
            .required('O campo senha é obrigatório'),
    })

    const login = async (data, reset, errors) => {
        setLoading(true)

        try {
            const userCredential = await fb_init.auth().signInWithEmailAndPassword(data.email, data.senha);
            reset({ initialValues });
            setLoading(false)
            navigation.navigate('ListPlayers', { name: 'ListPlayers' });
        }
        catch (error) {
            if(error.code === 'auth/user-not-found')
                errors({email: 'Email inválido. Usuário não cadastrado.'})
            else{
                errors({senha: ' A senha está incorreta'})
            }    
            setLoading(false)
        };
    }

    const screenUserRegister = () => {
        navigation.navigate('UserRegister', { name: 'UserRegister' })
    }

    return (
        <View>
            <LoadingModal modalVisible={loading} />
            <ComponentHeader title="Login"/>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(values, { resetForm, setErrors } ) => login(values, resetForm, setErrors)}
            >
                {({ values, handleChange, errors, touched, handleSubmit }) => (
                    <View>
                        <View style={styles.container}>
                            <Input
                                tipoTeclado="default"
                                label="E-mail:"
                                placeholder="E-mail"
                                value={values.email}
                                action={handleChange('email')}
                            />
                            {errors.email && touched.email &&
                                <ValidationForm message={errors.email} />
                            }
                            <View style={styles.containerSenha}>
                                <Input 
                                    tipoTeclado="default"
                                    placeholder="Senha"
                                    label="Senha:"
                                    value={values.senha}
                                    action={handleChange('senha')}
                                    security={true}
                                />
                            </View>
                            {errors.senha && touched.senha &&
                                <ValidationForm message={errors.senha} />
                            }
                            <View style={styles.containerBTN}>
                                <TouchableOpacity 
                                  style={styles.btn}
                                  onPress={handleSubmit}
                                >
                                    <Text style={styles.textoBtn}> Entrar</Text>                
                                </TouchableOpacity>
                            </View>  
                        </View>
                        <View style={styles.registerContainer}>
                            <Text style={{ color: "#6600ff" }}>Ainda não está cadastrado?</Text>
                            <Text
                                style={styles.link}
                                onPress={screenUserRegister}
                            >
                                Cadastrar
                            </Text>
                        </View> 
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({  
    container: {
        margin: 10,
        padding: 20
    },
    registerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },  
    input: {
        padding: 7,
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 5,
        borderColor: '#751aff',
        marginBottom: 10,
    },
    containerSenha: {
        minWidth: 200,
        marginTop: 10
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
    link: {
        color: "#6600ff",
        marginLeft: 5,
        fontWeight: "bold",
    }
});