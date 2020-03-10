import uuid from 'uuid/v4';
import { Layout, Menu, Modal, Dropdown, Icon, Drawer, Row, Col, Form, Input, Button, message } from 'antd';
import Link from 'next/link';
import Head from './head';
// import {CustomNProgress} from 'components';
import { compose } from 'recompose';
//import '../../../styles/main.scss';
import { withRouter, RouterProps, useRouter } from 'next/router';
import { ACCESS_TOKEN_NAME } from 'app-constants';
import { useAuthToken } from 'providers/account';
import { useState } from 'react';
import { useAccountEditUser } from 'api/myApis';
//   import { UserOutline, DoubleLeftOutline } from '@ant-design/icons';

const { confirm } = Modal;
const { Header, Content, Footer } = Layout;
const MenuItem = Menu.Item;

interface Props extends React.HTMLAttributes<any> {
  readonly children?: React.ReactNode;
  readonly description?: string;
  readonly ogImage?: string;
  readonly url?: string;
  readonly router?: RouterProps;
}

const activeClass = 'ant-menu-item-selected';

const MainLayout: React.SFC<Props> = ({ title, description, ogImage, url, router, children }) => {
  const { userToken } = useAuthToken();
  const user = userToken && userToken.userInfo;
  console.log('useToken', userToken);
  const routerD = useRouter();
  const { asPath } = router;
  const [state, setState] = useState(false);
  const [innerstate, setInnerState] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const { mutate: Update } = useAccountEditUser({});

  const { id } = user;
  const showDrawer = () => {
    setState(!state);
  };

  const onClose = () => {
    setState(!state);
  };

  const DescriptionItem = ({ title, content }) => (
    <div
      className="site-description-item-profile-wrapper"
      style={{
        fontSize: 14,
        lineHeight: '22px',
        marginBottom: 7,
      }}
    >
      <p
        className="site-description-item-profile-p"
        style={{
          marginRight: 8,
          display: 'inline-block',
        }}
      >
        {title}:
      </p>
      {content}
    </div>
  );

  const pStyle = {
    fontSize: 16,
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
  };

  const showDrawerInner = () => {
    setInnerState(!innerstate);
  };

  const Close = () => {
    setInnerState(!innerstate);
  };

  const onSubmit = () => {
    Update({ id, name, surname, mobilePhone })
      .then(response => {
        console.log(response);
        message.success('Details succesfully updated');
      })
      .catch(err => console.log(err));
    setInnerState(!innerstate);
  };

  const handleLogout = () => {
    confirm({
      title: 'Are you sure you want to Logout?',
      //icon: <QuestionCircleFill />,
      content: 'Remember to always keep it Wise on the Roads!!.',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.1 ? resolve : reject, 10);
          localStorage.removeItem(ACCESS_TOKEN_NAME);
          routerD.push('/sign-in');
        }).catch(() => console.log('Invalid'));
      },
      onCancel() {},
    });
  };

  const menuBotton = (
    <Menu>
      <Menu.Item key="1">
        <a onClick={showDrawer}>
          <Icon type="setting" />
          Update Details
        </a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={handleLogout}>
          <Icon type="poweroff" />
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      {/* <CustomNProgress /> */}
      <div className="box">
        <Head title={`TransportWise | ${title}`} description={description} ogImage={ogImage} url={url} />
        <Layout className="layout">
          <div className="header">TransportWise</div>
          <div className="header2">Thee actual blog</div>
          <Drawer width={720} placement="left" closable={true} onClose={onClose} visible={state}>
            <p className="site-description-item-profile-p" style={{ ...pStyle, marginBottom: 24 }}>
              <strong> User Profile </strong>
            </p>
            <Row>
              <p>
                <DescriptionItem title="Name" content={user.name} />
              </p>
              <p>
                <DescriptionItem title="Surname" content={user.surname} />
              </p>
            </Row>
            <hr />
            <Row>
              <p className="site-description-item-profile-p" style={{ ...pStyle, marginBottom: 24 }}>
                <strong> User Contacts </strong>
              </p>
              <Col span={12}>
                <DescriptionItem title="Mobile Phone Number" content={user.mobilePhone} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Email" content={user.email} />
              </Col>
            </Row>
            <Button type="primary" onClick={showDrawerInner}>
              Update Details
            </Button>
            <div className="drawer">
              <Drawer
                title="Update your details below"
                width={520}
                placement="left"
                onClose={Close}
                closable={false}
                visible={innerstate}
                bodyStyle={{ paddingBottom: 80 }}
              >
                <Form layout="vertical" hideRequiredMark>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Name">
                        <Input
                          placeholder="Please enter your name"
                          value={name}
                          onChange={e => setName(e.target.value)}
                        />
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
                <div
                  className="buttons"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e8e8e8',
                    padding: '10px 16px',
                    textAlign: 'right',
                    left: 0,
                    background: '#fff',
                    borderRadius: '0 0 4px 4px',
                  }}
                >
                  <Button onClick={Close} style={{ marginRight: 8 }}>
                    Cancel
                  </Button>
                  <Button onClick={onSubmit} type="primary">
                    Submit
                  </Button>
                </div>
              </Drawer>
            </div>
          </Drawer>
          <Header>
            <div className="logo" />
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
              <MenuItem key={uuid()} className={asPath === '/fuel-wise' ? activeClass : ''}>
                <Link href="/fuel-wise">
                  <a>FuelWise</a>
                </Link>
              </MenuItem>

              <MenuItem key={uuid()} className={asPath === '/public-transport' ? activeClass : ''}>
                <Link href="/public-transport">
                  <a>PublicTransport</a>
                </Link>
              </MenuItem>

              <MenuItem key={uuid()} className={asPath === '/about' ? activeClass : ''}>
                <Link href="/about">
                  <a>About Us</a>
                </Link>
              </MenuItem>

              {/*  <MenuItem key={uuid()} className={asPath === '/sign-in' ? activeClass : ''}>
              <a onClick={handleLogout}>Log out</a>
            </MenuItem> */}
              {user && (
                <Dropdown.Button overlay={menuBotton} onClick={showDrawer} size={'large'} icon={<Icon type="user" />}>
                  {`TransportWise: ${user.name} ${user.surname}`}
                </Dropdown.Button>
              )}
              {/* new-menu-item */}
            </Menu>
          </Header>
          <hr />
          <hr />
          <Content>
            <div className="content-body">{children}</div>
          </Content>
          <Footer>TransportWise @{new Date().getFullYear()} Created by Maseru Kganyago</Footer>
        </Layout>
      </div>
    </>
  );
};

export default compose<Props, Props>(withRouter)(MainLayout);
