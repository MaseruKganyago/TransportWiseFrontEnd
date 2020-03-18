import { useState } from 'react';
import { useImagesSetProfile } from 'api/myApis';
import { message, Icon, Upload, Button } from 'antd';
import { useAuthToken } from 'providers/account';

export const UserProfile = () => {
  const [state, setState] = useState({ loading: false, stateUrl: '', stateView: '' });
  const [typePic, setType] = useState();
  const { mutate: HandleFile } = useImagesSetProfile({});
  const { userToken } = useAuthToken();
  console.log('userTokenCheck', userToken);
  const user = userToken && userToken.userInfo;
  console.log('user', user);

  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    } else setType(file.type);
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (img: Blob, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setState({ loading: true, stateUrl: '', stateView: '' });
      return;
    } else if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        setState({ loading: false, stateUrl: imageUrl.substr(23), stateView: imageUrl });
        console.log('imageEncoded', imageUrl);
      });
    }
  };

  const uploadButton = (
    <div>
      <Icon type={state.loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  console.log('showId', user.id);
  const handleSubmit = () => {
    HandleFile({ id: user.id, name: user.name, data: state.stateUrl, type: typePic })
      .then(() => alert('Profile image Succesfully set, Ready to update user details.'))
      .catch(err => console.log('err', err));
  };
  console.log(typePic);
  return (
    <div className="Upload">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {state.stateView ? <img src={state.stateView} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      <Button type="primary" onClick={handleSubmit}>
        Set Profile
      </Button>
    </div>
  );
};
