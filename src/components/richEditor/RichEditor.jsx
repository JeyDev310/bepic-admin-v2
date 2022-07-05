import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

const editorConfiguration = {
  toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'uploadImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo']
}

export default function RichEditor(props) {
  return (
    <CKEditor
      editor={Editor}
      config={ editorConfiguration }
      onReady={(editor) => {
        editor.setData(props.value);
      }}
      data={props.value}
      onChange={(event, editor) => {
        const data = editor.getData();
        props.onChange(data);
      }}
    />
  );
}
