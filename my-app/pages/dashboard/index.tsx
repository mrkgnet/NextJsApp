import React from 'react';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { redirect } from 'next/dist/server/api-utils';
import { withAuth } from '@/lib/withAuth';

const Dashboard = ({ user }) => {
    return (
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <h1 className="text-2xl font-bold mb-4">داشبورد</h1>

            {user ? (
                <div className="text-lg">
                    👋 خوش اومدی <span className="font-semibold">{user.firstname}</span>
                    <br />
                    <br />
                    <span>{user.email}</span>
                </div>
            ) : (
                <div>در حال بارگذاری...</div>
            )}
        </div>
    );
};

export default Dashboard;
 
    export const getServerSideProps = withAuth()