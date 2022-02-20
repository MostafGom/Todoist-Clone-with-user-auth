import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context'
import { Container } from 'react-bootstrap'

function Login() {

    const emailRef = useRef()
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth()
    const [unmounted, setUnmounted] = useState({});
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')

        } catch (error) {
            setError("Failed To Sign In")
        }
        setLoading(false)
    }

    useEffect(() => {
        return () => {
            setUnmounted({})
        }
    }, [])

    return (
        <>
            <Container className='d-flex align-items-center justify-content-center'
                style={{ minHeight: '100vh' }} >
                <div className='w-100' style={{ maxWidth: '400px' }} >

                    <Card>
                        <Card.Body>
                            <h2 className='text-center mb-4' >Log In</h2>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id='email' className='mb-2'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email' required ref={emailRef} autoComplete="off" />
                                </Form.Group>
                                <Form.Group id='password' className='mb-2'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' required ref={passwordRef} autoComplete="off" />
                                </Form.Group>

                                <Button disabled={loading} className='w-100 mt-3 btn-gen-color' type='submit'>Log In</Button>
                            </Form>

                            <div className='w-100 text-center mt-2'>
                                <Link to='/forgot-password'>forgot your password</Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        Don't have an account? <Link to='/signup'>SignUp</Link>
                    </div>
                </div>
            </Container>

        </>
    );
}

export default Login;
