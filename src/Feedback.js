import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './Layout';

const Feedback = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: '',
        phone: '',
        uploadedFiles: [],
        buttonText: 'Submit',
        uploadPhotosButtonText: 'Upload files'
    });

    // destructure state variables
    const { name, email, message, phone, uploadedFiles, buttonText, uploadPhotosButtonText } = values;
    // destructure env variables
    const { REACT_APP_API, REACT_APP_CLOUDINARY_CLOUD_NAME, REACT_APP_CLOUDINARY_UPLOAD_SECRET } = process.env;

    // event handler
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: '...sending' });
        // send to backend for email
        // console.table({ name, email, phone, message, uploadedFiles });
        axios({
            method: 'POST',
            url: `${REACT_APP_API}/feedback`,
            headers: {
                'Content-Type': 'application/json',
              },
            data: { name, email, phone, message, uploadedFiles }
        })
            .then(response => {
                // console.log('feedback submit response', response);
                if (response.data.success) toast.success('Thanks for your feedback');
                setValues({
                    ...values,
                    name: '',
                    phone: '',
                    email: '',
                    message: '',
                    uploadedFiles: [],
                    buttonText: 'Submitted',
                    uploadPhotosButtonText: 'Uploaded'
                });
            })
            .catch(error => {
               //  console.log('feedback submit error', error.response);
                if (error.response.data.error) toast.error('Failed! Try again!');
            });
    };

    const uploadWidget = () => {
        window.cloudinary.openUploadWidget(
            {
                cloud_name: REACT_APP_CLOUDINARY_CLOUD_NAME,
                upload_preset: REACT_APP_CLOUDINARY_UPLOAD_SECRET,
                tags: ['ebooks']
            },
            function(error, result) {
               //  console.log(result);
                setValues({
                    ...values,
                    uploadedFiles: result,
                    uploadPhotosButtonText: `${result ? result.length : 0} Photos uploaded`
                });
            }
        );
    };

    const feedbackForm = () => (
        <React.Fragment>
            <div className="form-group">
                <button onClick={() => uploadWidget()} className="btn btn-outline-secondary btn-block p-5">
                    {uploadPhotosButtonText}
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Description</label>
                    <textarea
                        onChange={handleChange('message')}
                        type="text"
                        className="form-control"
                        value={message}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label className="text-muted">Your Name</label>
                    <input className="form-control" type="text" onChange={handleChange('name')} value={name} required />
                </div>
                <div className="form-group">
                    <label className="text-muted">Your Email</label>
                    <input
                        className="form-control"
                        type="email"
                        onChange={handleChange('email')}
                        value={email}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Your Phone</label>
                    <input
                        className="form-control"
                        type="number"
                        onChange={handleChange('phone')}
                        value={phone}
                        required
                    />
                </div>

                <button className="btn btn-outline-primary btn-block">{buttonText}</button>
            </form>
        </React.Fragment>
    );

    return (
        <Layout>
            <ToastContainer />
            <div className="container text-center">
                <h1 className="p-5">Feedback Online</h1>
            </div>
            <div className="container col-md-8 offset-md-2">{feedbackForm()}</div>
            <br />
            <br />
            <br />
        </Layout>
    );
};

export default Feedback;
