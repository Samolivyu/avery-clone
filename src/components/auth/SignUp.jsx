import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authManager } from '../../utils/auth.js';
import { toast } from 'sonner';

const SignUp = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();

  // New personal info fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  // Legacy / additional fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pin, setPin] = useState('');
  const [department, setDepartment] = useState('general');
  const [role, setRole] = useState('employee');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const departments = ['general', 'development', 'qa', 'design', 'management'];
  const roles = ['employee', 'manager', 'admin'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const result = await authManager.register({
        firstName,
        lastName,
        employeeId,
        email,
        password,
        department,
        role,
        pin: pin || null,
      });

      if (result.success) {
        toast.success('Registration successful! Please sign in.');
        onRegisterSuccess?.();
      } else {
        setError(result.error);
        toast.error('Registration failed: ' + result.error);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred during registration');
      toast.error('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };
return (
  <section className="bg-stone-50 min-h-screen flex items-center justify-center">
    <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-md">
      
      {/* Header with Logo and Title */}
      <div className="text-center">
        <img 
          className="w-12 h-12 mx-auto mb-3" 
          src="/images/aea-logo.webp" 
          alt="AVERY LOGO" 
        />
        <h1 className="text-2xl font-bold text-gray-800">Create an account</h1>
        <p className="text-sm text-gray-500">Please fill in the details below.</p>
      </div>

      {/* Registration Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
            className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Employee ID */}
        <div>
          <label htmlFor="employeeId" className="block mb-2 text-sm font-medium text-gray-700">
            Employee ID
          </label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={e => setEmployeeId(e.target.value)}
            required
            className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-700">
            Confirm password
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Optional PIN */}
        <div>
          <label htmlFor="pin" className="block mb-2 text-sm font-medium text-gray-700">
            Optional PIN (4-6 digits)
          </label>
          <input
            type="password"
            id="pin"
            placeholder="••••"
            value={pin}
            onChange={e => {
              const val = e.target.value;
              if (/^\d*$/.test(val) && val.length <= 6) setPin(val);
            }}
            maxLength="6"
            className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Department */}
        <div>
          <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            id="department"
            value={department}
            onChange={e => setDepartment(e.target.value)}
            required
            className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={e => setRole(e.target.value)}
            required
            className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          >
            {roles.map(r => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Terms */}
        <div className="flex items-start">
          <input
            id="terms"
            type="checkbox"
            required
            className="w-4 h-4 border rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
          />
          <label htmlFor="terms" className="ml-3 text-sm font-light text-gray-500">
            I accept the{' '}
            <a href="#" className="font-medium text-blue-600 hover:underline">
              Terms and Conditions
            </a>
          </label>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5 text-sm font-medium"
        >
          {loading ? 'Creating account...' : 'Create an account'}
        </button>

        {/* Navigation Links */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-blue-600 hover:underline"
            >
              Login here
            </button>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Want to use PIN?{' '}
            <button
              onClick={() => navigate('/pin')}
              className="font-medium text-blue-600 hover:underline"
            >
              Login with PIN
            </button>
          </p>
        </div>
      </form>
    </div>
  </section>
);
};

export default SignUp;