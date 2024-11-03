import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'antd';
import TempTable from '../temp/tempTable';
import { NavigationBar } from '../components/navigationBar';

export const DetailPage = () => {
    const navigate = useNavigate();

    const goBackHome = () => {
        navigate("/");
    };

    return (
        <>
        <NavigationBar/>
            <TempTable />
            <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
                <Button type="primary" onClick={goBackHome}>
                    Back Home
                </Button>
            </div>
        </>
    );
};

export default DetailPage;