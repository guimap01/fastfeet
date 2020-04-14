import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';

import imageIcon from '~/assets/imageIcon.png';

import { Container } from './styles';

export default function AvatarInput() {
  const { registerField } = useField('avatar');

  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    setFile(response.data.id);

    setPreview(response.data.url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img src={preview || imageIcon} alt="" />

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
