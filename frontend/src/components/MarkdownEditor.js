import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MarkdownEditor.css';

const MarkdownEditor = () => {
        const [markdown, setMarkdown] = useState('');
        const [html, setHtml] = useState('');
        const [error, setError] = useState(null);

        useEffect(() => {
            const convertMarkdownToHtml = async function convertMarkdownToHtml(markdown) {
                try {
                    const response = await axios.post('http://localhost:5000/convert', { markdown });
                    setHtml(response.data.html);
                    setError(null); // Clear any previous errors
                } catch (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        setError(error.response.data.error || 'Internal Server Error');
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                        setError('No response received from server');
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                        setError(error.message || 'An error occurred');
                    }
                }
            }

            if (markdown) {
                convertMarkdownToHtml();
            }
        }, [markdown]);

        return ( <
            div className = "editor-container" >
            <
            textarea className = "markdown-input"
            value = { markdown }
            onChange = {
                (e) => setMarkdown(e.target.value) }
            placeholder = "Type your Markdown here..." /
            > {
                error && < div className = "error-message" > { error } < /div>} <
                div
                className = "html-output"
                dangerouslySetInnerHTML = {
                    { __html: html } }
                /> <
                /div>
            );
        };

        export default MarkdownEditor;