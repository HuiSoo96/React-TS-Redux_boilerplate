import * as React from 'react'
import { Form, Select, Button, Input } from 'antd'

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  

const test = () => {

    const [form] = Form.useForm();

    const onGenderChange = (value: string) => {
      switch (value) {
        case 'male':
          form.setFieldsValue({ note: 'Hi, man!' });
          return;
        case 'female':
          form.setFieldsValue({ note: 'Hi, lady!' });
          return;
        case 'other':
          form.setFieldsValue({ note: 'Hi there!' });
      }
    };
  
    const onFinish = (values: any) => {
      console.log(values);
    };
  
    const onReset = () => {
      form.resetFields();
    };
  
    const onFill = () => {
      form.setFieldsValue({
        note: 'Hello world!',
        gender: 'male',
      });
    };
  
    return (
        <>
          <div>






          </div>
        </>
    )
}

export default test;