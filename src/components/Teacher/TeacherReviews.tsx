import React from 'react';

const TeacherReviews: React.FC = () => {
    return (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
            {/* Review 1 */}
            <div className="card shadow-2xl p-6">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-light-text dark:text-dark-text">John Doe</h3>
                        <p className="text-light-text dark:text-dark-text">Math Teacher</p>
                    </div>
                    <span className="badge badge-secondary">5 stars</span>
                </div>
                <p className="mt-4 text-light-text dark:text-dark-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus fermentum libero, et lacinia libero gravida ut.</p>
            </div>

            {/* Review 2 */}
            <div className="card shadow-2xl p-6">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-light-text dark:text-dark-text">Jane Smith</h3>
                        <p className="text-light-text dark:text-dark-text">English Teacher</p>
                    </div>
                    <span className="badge badge-secondary">4 stars</span>
                </div>
                <p className="mt-4 text-light-text dark:text-dark-text">Vivamus eu erat sed leo consequat accumsan ac eget diam. Curabitur fringilla maximus justo, in tincidunt nunc.</p>
            </div>

            {/* Review 3 */}
            <div className="card shadow-2xl p-6">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-light-text dark:text-dark-text">Michael Johnson</h3>
                        <p className="text-light-text dark:text-dark-text">Science Teacher</p>
                    </div>
                    <span className="badge badge-secondary">4 stars</span>
                </div>
                <p className="mt-4 text-light-text dark:text-dark-text">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
            </div>

            {/* Review 4 */}
            <div className="card shadow-2xl p-6">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-light-text dark:text-dark-text">Emily Brown</h3>
                        <p className="text-light-text dark:text-dark-text">History Teacher</p>
                    </div>
                    <span className="badge badge-secondary">5 stars</span>
                </div>
                <p className="mt-4 text-light-text dark:text-dark-text">Nullam vel risus dignissim, dignissim dui nec, ultricies velit. Nullam malesuada aliquam purus sit amet.</p>
            </div>

            {/* Review 5 */}
            <div className="card shadow-2xl p-6">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-light-text dark:text-dark-text">Sarah Johnson</h3>
                        <p className="text-light-text dark:text-dark-text">Art Teacher</p>
                    </div>
                    <span className="badge badge-secondary">3 stars</span>
                </div>
                <p className="mt-4 text-light-text dark:text-dark-text">Fusce pretium odio vitae sapien mollis, ac faucibus purus dapibus. Nam nec erat nec risus auctor malesuada.</p>
            </div>

            {/* Review 6 */}
            <div className="card shadow-2xl p-6">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-light-text dark:text-dark-text">Adam Wilson</h3>
                        <p className="text-light-text dark:text-dark-text">Physical Education Teacher</p>
                    </div>
                    <span className="badge badge-secondary">4 stars</span>
                </div>
                <p className="mt-4 text-light-text dark:text-dark-text">Integer sit amet ligula a nibh ultrices vehicula. Aliquam erat volutpat.</p>
            </div>
        </div>
    );
};

export default TeacherReviews;
