import React from 'react';

const TeacherReviews: React.FC = () => {
    return (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
            {/* Review 1 */}
            <div className="card shadow-2xl p-6">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl font-bold">John Doe</h3>
                        <p className="text-gray-600">Math Teacher</p>
                    </div>
                    <span className="badge badge-secondary">5 stars</span>
                </div>
                <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus fermentum libero, et lacinia libero gravida ut.</p>
            </div>

            {/* Review 2 */}
            <div className="card shadow-2xl p-6">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl font-bold">Jane Smith</h3>
                        <p className="text-gray-600">English Teacher</p>
                    </div>
                    <span className="badge badge-secondary">4 stars</span>
                </div>
                <p className="mt-4">Vivamus eu erat sed leo consequat accumsan ac eget diam. Curabitur fringilla maximus justo, in tincidunt nunc.</p>
            </div>

            {/* Review 3 */}
            <div className="card shadow-2xl p-6">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl font-bold">Michael Johnson</h3>
                        <p className="text-gray-600">Science Teacher</p>
                    </div>
                    <span className="badge badge-secondary">4 stars</span>
                </div>
                <p className="mt-4">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
            </div>

            {/* Review 4 */}
            <div className="card shadow-2xl p-6">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl font-bold">Emily Brown</h3>
                        <p className="text-gray-600">History Teacher</p>
                    </div>
                    <span className="badge badge-secondary">5 stars</span>
                </div>
                <p className="mt-4">Nullam vel risus dignissim, dignissim dui nec, ultricies velit. Nullam malesuada aliquam purus sit amet.</p>
            </div>

            {/* Review 5 */}
            <div className="card shadow-2xl p-6">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl font-bold">Sarah Johnson</h3>
                        <p className="text-gray-600">Art Teacher</p>
                    </div>
                    <span className="badge badge-secondary">3 stars</span>
                </div>
                <p className="mt-4">Fusce pretium odio vitae sapien mollis, ac faucibus purus dapibus. Nam nec erat nec risus auctor malesuada.</p>
            </div>

            {/* Review 6 */}
            <div className="card shadow-2xl p-6">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl font-bold">Adam Wilson</h3>
                        <p className="text-gray-600">Physical Education Teacher</p>
                    </div>
                    <span className="badge badge-secondary">4 stars</span>
                </div>
                <p className="mt-4">Integer sit amet ligula a nibh ultrices vehicula. Aliquam erat volutpat.</p>
            </div>
        </div>
    );
};

export default TeacherReviews;
