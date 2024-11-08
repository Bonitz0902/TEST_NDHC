import React, {useState} from "react";

import {Button, Checkbox, Form, Grid, Input, message, theme, Typography} from "antd";

import {LockOutlined, MailOutlined,} from "@ant-design/icons";
import {login} from '../api/inventory/actions.js'
import {useNavigate} from "react-router-dom";

const {useToken} = theme;
const {useBreakpoint} = Grid;
const {Text, Title, Link} = Typography;

export const LoginPage = ({setToken}) => {
    const {token} = useToken();
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {

            setLoading(true);
            const response = await login({username: values.email, password: values.password});

            console.log(response.token)
            const token = response.token
            localStorage.setItem('token', token)
            navigate('/')
        } catch (error) {
            message.error('Login failed! Please check your username and password.');
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            margin: "0 auto",
            padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
            width: "380px"
        },
        footer: {
            marginTop: token.marginLG,
            textAlign: "center",
            width: "100%"
        },
        forgotPassword: {
            float: "right"
        },
        header: {
            marginBottom: token.marginXL
        },
        section: {
            alignItems: "center",
            backgroundColor: token.colorBgContainer,
            display: "flex",
            height: screens.sm ? "100vh" : "auto",
            padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
        },
        text: {
            color: token.colorTextSecondary
        },
        title: {
            fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
        }
    };

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <div style={styles.header}>

                    <Title style={styles.title}>Sign in</Title>
                    <Text style={styles.text}>
                        Welcome!
                    </Text>
                </div>
                <Form
                    name="normal_login"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "username",
                                required: true,
                                message: "Please input your Email!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined/>}
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a style={styles.forgotPassword} href="">
                            Forgot password?
                        </a>
                    </Form.Item>
                    <Form.Item style={{marginBottom: "0px"}}>
                        <Button block="true" type="primary" htmlType="submit" loading={loading}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}