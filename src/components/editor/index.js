import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
// import Image from '@ckeditor/ckeditor5-image/src/image';
// import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
// import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
// import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import '../css/ckEditor.css';

class App extends Component {

  handleEditorChange() {
    return (event, editor) => {
      // this.setState( { content: editor.getData() } );
      console.log(editor.getData());

       this.props.handleChange(editor.getData());
    }
  }
  render() {
    
    return (
      <CKEditor
      
        data=""
        onInit={(editor) => console.log("Editor is ready to use!", editor)}
        onChange={ this.handleEditorChange()}
        onBlur={(event, editor) => {
          console.log("Blur.", { event, editor });
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", { event, editor });
        }}
        editor={ClassicEditor}
        config={{
          // plugins:[EasyImage, Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload],
          ckfinder: {
            // Upload the images to the server using the CKFinder QuickUpload command
            // You have to change this address to your server that has the ckfinder php connector
            uploadUrl: '/uploads'
        }}
        } 
        
      />
    );
  }
}

export default App;
