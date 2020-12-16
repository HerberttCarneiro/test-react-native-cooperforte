import React, { useState } from "react";
import { reduxForm, Field, change } from "redux-form";
import {
  Form,
  Container,
  Content,
  Text,
  Button,
  View,
  Icon,
} from "native-base";
import { createEmployee } from "./behaviors";
import { Contact, Email } from "../../types/interfaces";
import { TouchableOpacity } from "react-native-gesture-handler";
import SimpleInput from "../../components/Inputs/SimpleInput/SimpleInput";
import { cep, cpf, email, required } from "../../utils/validation";
import {
  cepNormalize,
  cpfNormalize,
  phoneNormalize,
} from "../../utils/normalize";
import { Address, getInfoByCep } from "../../services/viaCep";
import styles from "./styles";
import PickerInput from "../../components/Inputs/PickerInput/PickerInput";
import Multiselect from "../../components/Inputs/Multiselect/Multiselect";

interface onBlurInput {
  nativeEvent: {
    text: string;
  };
}

const FormEmployee: React.FC<any> = (props) => {
  const contact: Contact = {
    value: "",
    contactType: {
      id: 1,
      name: "",
    },
  };

  const [contacts, setContacts] = useState<Contact[]>([contact]);
  const emails: Email[] = [];
  const { handleSubmit } = props;

  const addContact = () => {
    setContacts([...contacts, contact]);
  };

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

export default reduxForm<any, any>({
  form: "Employee",
  onSubmitFail: (err) => {
    alert(`Por favor, preencha os campos obrigatórios`);
  },
})(FormEmployee);
