import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockAuth } from '../../utils/auth';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export const SignUp = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pin, setPin] = useState('');
  const [department, setDepartment] = useState('general');
  const [role, setRole] = useState('employee');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const departments = ['general', 'development', 'qa', 'design', 'management'];
  const roles = ['employee', 'manager', 'admin'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await mockAuth.register({
        firstName, lastName, employeeId, email, password, confirmPassword,
        department, role, pin: pin || null, termsAccepted
      });

      if (!result.success) {
        setError(result.error);
        toast.error(result.error);
      } else {
        toast.success('Registration successful! Please log in.');
        onRegisterSuccess?.();
        navigate('/login');
      }
    } catch (err) {
      setError('An error occurred during registration');
      toast.error('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-stone-50 min-h-screen flex items-center justify-center w-full">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 sm:p-8">
          <div className="text-center">
            <img className="w-12 h-12 mx-auto mb-3" src="/images/aea-logo.webp" alt="Logo" />
            <h1 className="text-2xl font-bold text-gray-800">Create an account</h1>
            <p className="text-sm text-gray-500">Please fill in the details below.</p>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
                <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
              </div>
            </div>
            <div>
              <label htmlFor="employeeId" className="block mb-2 text-sm font-medium text-gray-700">Employee ID</label>
              <input type="text" id="employeeId" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Your email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">Confirm</label>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
              </div>
            </div>
            <div>
              <label htmlFor="pin" className="block mb-2 text-sm font-medium text-gray-700">Optional PIN (4-6 digits)</label>
              <input type="password" id="pin" value={pin} onChange={(e) => /^\d*$/.test(e.target.value) && e.target.value.length <= 6 && setPin(e.target.value)} maxLength="6" className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-700">Department</label>
                <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none">
                  {departments.map(d => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-700">Role</label>
                <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none">
                  {roles.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
                </select>
              </div>
            </div>
            <div className="flex items-start">
              <input id="terms" type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required className="w-4 h-4 mt-1 border rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
              <label htmlFor="terms" className="ml-3 text-sm font-light text-gray-500">
                I accept the <a href="#" className="font-medium text-blue-600 hover:underline">Terms and Conditions</a>
              </label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={loading || !termsAccepted} className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Creating account...' : 'Create an account'}
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:underline">Login here</Link>
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Want to use PIN?{' '}
                <button type="button" onClick={() => navigate('/pin')} className="font-medium text-blue-600 hover:underline">
                  Login with PIN
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
