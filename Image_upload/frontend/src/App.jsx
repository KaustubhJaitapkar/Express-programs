import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react';

function App() {
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const onChange = e => {
    setFiles(e.target.files);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    Object.values(files).forEach(file => {
      formData.append('uploadImages', file);
    });

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res);
      fetchImages(); // Fetch images again after upload
    } catch (err) {
      console.error(err.response ? err.response.data.msg : err);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/images');
      setImageUrls(res.data.images);
    } catch (err) {
      console.error('Error fetching images', err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <Fragment>
        <form onSubmit={onSubmit}>
          <div>
            <input type='file' id='file' name='uploadImages' multiple onChange={onChange} />
          </div>
          <input type='submit' value='Upload' />
        </form>

        <div style={{ marginTop: '20px' }}>
          <h2>Uploaded Images</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded ${index}`}
                style={{ width: '150px', height: '150px', objectFit: 'cover', margin: '5px' }}
              />
            ))}
          </div>
        </div>
      </Fragment>
    </>
  );
}

export default App;
