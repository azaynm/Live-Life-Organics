import React from 'react'

const API_BASE = "http://localhost:8080";
const SalaryManagement = () => {

    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchEmployees = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_BASE}/api/employee/employees`);
            const employees = response.data;
            setEmployees(employees);
        } catch (error) {
            console.log("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);
  return (
    <div className='container vh-100'>SalaryManagement</div>
  )
}

export default SalaryManagement