import request from 'superagent';

export async function cloudinaryUpdate (url, uploadPreset, files, description, section, onImageUploaded, onNotification, onGetImages, onUploading, onUploadingProgress, onFinished) {
        try {
            onUploading(true)
            for (let file of files) {
                request.post(url)
                    .field('upload_preset', uploadPreset)
                    .field('file', file)
                    .field('multiple', true)
                    .field('tags', section ? `${section}` : 'untagged')
                    .field('context', section ? `photo=${section}` : '')
                    .field('folder', section ? `${section}` : '')
                    .on('progress', (_progress) =>
                        onUploadingProgress(Math.floor(_progress.percent))
                    )
                    .end((error, response) => {
                        if (response && response.statusCode == 200) {
                            const _id = response.body.public_id.split('/');
                            (async () => {
                                const data = {
                                    id: _id[1],
                                    url: response.body.secure_url,
                                    publicId: response.body.public_id,
                                    section,
                                    description
                                }
                                const res = onImageUploaded(data)
                                if (res.data.status === 'OK') {
                                    onNotification('success', 'Imatge pujada correctament!')
                                } else {
                                    onNotification('danger', `ERROR! ${res.data.message}`)
                                }
                            })();
                            onGetImages()
                            onUploading(false)
                        } else {
                            onNotification('danger', "Error en la pujada!" )
                        }
                        onFinished()
                    });
            }
        } catch (error) {
            throw Error(error.message)
        }
}