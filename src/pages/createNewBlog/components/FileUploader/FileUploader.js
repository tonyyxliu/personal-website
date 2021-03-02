import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

/* Import Server BaseURL */
import { baseURL } from '../../../../api/backend';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)







// Our app
export default function FileUploader(props) {
  const [files, setFiles] = useState([])

  useEffect( () => {
		document.addEventListener('FilePond:loaded', e => {
			console.log('FilePond ready for use', e.detail);
		});
	}, [] )

	/* Configuring the Server */
	// const server = {
	// 	url: baseURL,
	// 		process: {
	// 				url: './filePondUploadImage',
	// 				method: 'POST',
	// 				withCredentials: false,
	// 				headers: {},
	// 				timeout: 7000,
	// 				onload: null,
	// 				onerror: null,
	// 				ondata: null
	// 		},
	// };

  return (
    <div className="App">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        // maxFiles={3}
        server={{
					process: {
						url: `${baseURL}/filePondUploadImage`,
						onload: (resp) => {
							console.log(`onload response = ${ resp } with type = ${typeof(resp)}`);
							
							let json = JSON.parse(resp);
							console.log(`json = ${ JSON.stringify(json) }`);

							// set imageURL in father component through the input setState function by props
							props.setImageHashCodeFunction( parseInt( json["imageHashCode"], 10 ) );
							props.setImageNameFunction(json["imageName"]);
						},
					},
				}}
        name="image" /* sets the file input name, it's filepond by default, 此处为传到后端的form-data的key值，请务必与后端同步 */
        labelIdle= {"Drag & Drop your files or <span class='filepond--label-action'>Browse</span>"}
      />
    </div>
  )
}



