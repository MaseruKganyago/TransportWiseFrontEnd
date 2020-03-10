import { useState } from 'react';
import { Drawer, Form, Row, Col, Input, Button } from 'antd';
import { useAccountEditUser } from 'api/myApis';
import { useAuthToken } from 'providers/account';

const updateUser = () => {
  const [state, setState] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const { mutate: Update } = useAccountEditUser({});
  const { userToken } = useAuthToken();
  const user = userToken.userInfo;
  const { id } = user;

  const showDrawer = () => {
    setState(!state);
  };

  const onClose = () => {
    setState(!state);
  };

  const onSubmit = () => {
    Update({ id, name, surname, mobilePhone })
      .then(response => console.log(response))
      .catch(err => console.log(err));
    setState(!state);
  };

  return (
    <div className="drawer">
      <Drawer
        title="Create a new account"
        width={720}
        onClose={this.onClose}
        visible={this.state.visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Name">
                <Input placeholder="Please enter your name" value={name} onChange={e => setName(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="surname">
                <Input
                  placeholder="Please enter your surname"
                  value={surname}
                  onChange={e => setSurname(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="MobileNumber">
                <Input
                  placeholder="Please enter your Mobile Number"
                  value={mobilePhone}
                  onChange={e => setMobilePhone(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className="buttons">
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={onSubmit} type="primary">
            Submit
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default updateUser;
