import { Col, Row, Button, Card } from "antd";
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import '../css/LandingPageDesign.css';

export const LandingPage = () => {
    const navigate = useNavigate()
    const handleButtonClick = () => navigate("/inventory-items");
    return(
        <div className="div-landing">
            <Row className="row-landing">
                <Col span={12}>
                    <h1>Inventory Management System</h1>
                    <Button type="primary" size="large" onClick={handleButtonClick}>
                        Proceed to Inventory<ArrowRightOutlined />
                    </Button>
                </Col>
                <Col span={12}>
                    <Card hoverable title="lorem ipsum">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                    </Card>
                </Col>
            </Row>
        </div>
    )
}