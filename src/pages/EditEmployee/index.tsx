import React, { useState } from "react";
import { reduxForm, Field, change } from "redux-form";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Form,
  Container,
  Content,
  Text,
  Button,
  View,
  Icon,
  Toast,
} from "native-base";

import { Contact, ContactTypeValues } from "../../types/interfaces";
import api from "../../services/api";
import { IFormEmployee } from "./types";
import { cep, cpf, required } from "../../utils/validation";
import styles from "./styles";
import SimpleInput from "../../components/Inputs/SimpleInput/SimpleInput";
import {
  cepNormalize,
  cpfNormalize,
  phoneNormalize,
} from "../../utils/normalize";
import PickerInput from "../../components/Inputs/PickerInput/PickerInput";
import Multiselect from "../../components/Inputs/Multiselect/Multiselect";
import { Address, getInfoByCep } from "../../services/viaCep";

let FormUpdateEmployee: React.FC<any> = (props) => {
  const contactsDefault = props.route.params.contacts;
  const { handleSubmit } = props;
  const [contacts, setContacts] = useState<Contact[]>(contactsDefault ?? []);

  async function createEmployee(formValues: IFormEmployee) {
    console.log(formValues, "formValues");

    try {
      await api.put(`/customers/${formValues.id}`, formValues);
      Toast.show({
        position: "top",
        text: "Updated!",
      });
    } catch (error) {
      console.log(error.response);

      if (error.response.status == 500)
        return Toast.show({
          type: "danger",
          text: "Internal Server Error",
        });
      if (error.response.status == 400)
        return Toast.show({
          type: "danger",
          text: error.response.data.error,
        });

      Toast.show({
        type: "danger",
        text: "Error",
      });
    }
  }

  function addContact() {
    const contact: Contact = {
      contactType: {
        id: 1,
        name: "",
      },
    };

    setContacts([...contacts, contact]);
  }

  const getAddress = async (cep: string) => {
    if (cep.length < 8) {
      return;
    }
    let address = await getInfoByCep(cep);
    setAddressFields(address);
  };

  const setAddressFields = (address: Address) => {
    props.dispatch(change("Employee", "state", address.uf));
    props.dispatch(change("Employee", "city", address.localidade));
    props.dispatch(change("Employee", "district", address.bairro));
    props.dispatch(change("Employee", "address", address.logradouro));
  };

  return (
    <Container>
      <Content>
        <Form style={styles.form}>
          <View>
            <Text style={styles.subtitle}>Dados pessoais</Text>
            <Field
              placeholder="Nome completo"
              name={"name"}
              component={SimpleInput}
              validate={[required]}
            />
            <Field
              placeholder="CPF"
              name={"cpf"}
              keyboardType="numeric"
              component={SimpleInput}
              normalize={cpfNormalize}
              maxLength={14}
              validate={[required, cpf]}
            />
          </View>

          <View>
            <Text style={styles.subtitle}>Endereço</Text>
            <Field
              placeholder="CEP"
              name={"cep"}
              keyboardType="numeric"
              component={SimpleInput}
              normalize={cepNormalize}
              maxLength={10}
              onBlur={(event: { nativeEvent: any }) =>
                getAddress(event.nativeEvent.text)
              }
              validate={[required, cep]}
            />
            <Field
              placeholder="Endereço"
              name={"address"}
              component={SimpleInput}
              validate={[required]}
            />
            <Field
              placeholder="Estado"
              name={"state"}
              component={SimpleInput}
              validate={[required]}
            />
            <Field
              placeholder="Cidade"
              name={"city"}
              component={SimpleInput}
              validate={[required]}
            />
            <Field
              placeholder="Bairro"
              name={"district"}
              component={SimpleInput}
              validate={[required]}
            />
          </View>
          <Field
            name="emails"
            title={"E-mail"}
            placeholder="Digite seu email..."
            component={Multiselect}
            validate={[required]}
          />

          <View style={styles.viewContact}>
            <Text style={styles.contactTitle}>Contatos</Text>
            <TouchableOpacity onPress={() => addContact()}>
              <Icon name="add"></Icon>
            </TouchableOpacity>
          </View>

          {contacts.map((contact, index: number) => {
            return (
              <View key={index} style={styles.contactContent}>
                <Field
                  value={contacts[index].contactType}
                  name={`contacts[${index}].contactType`}
                  title={"Contacts"}
                  placeholder="Tipo de contato"
                  component={PickerInput}
                  validate={[required]}
                />
                <Field
                  value={contacts[index].value}
                  name={`contacts[${index}].value`}
                  title={"Contacts"}
                  placeholder="Digite seu contato"
                  normalize={phoneNormalize}
                  maxLength={10}
                  component={SimpleInput}
                  validate={[required]}
                />
              </View>
            );
          })}
        </Form>
      </Content>
      <Button full primary onPress={handleSubmit(createEmployee)}>
        <Text>Submit</Text>
      </Button>
    </Container>
  );
};

// const mapStateToProps = (state: any, props: any) => {
//   const employee = props.route.params;

//   return {
//     initialValues: employee,
//   };
// };

FormUpdateEmployee = reduxForm({
  form: "Employee",
  onSubmitFail: (err) => {
    console.log(err);

    alert(`Por favor, preencha os campos obrigatórios`);
  },
})(FormUpdateEmployee);

FormUpdateEmployee = connect((state, props: any) => ({
  initialValues: {
    ...props.route.params,
    cep: cepNormalize(props.route.params.cep),
    cpf: cpfNormalize(props.route.params.cpf),
    contacts: props.route.params.contacts.map((contact: Contact) => {
      contact.value = phoneNormalize(contact.value);
      console.log(contact.value);
      return contact;
    }),
  },
}))(FormUpdateEmployee);
export default FormUpdateEmployee;
