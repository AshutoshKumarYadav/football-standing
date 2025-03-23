import React, { useState } from 'react';
import axios from 'axios';

const FootballForm = () => {
  const [formData, setFormData] = useState({ country: '', league: '', team: '' });
  const [result, setResult] = useState(null);
  const [offline, setOffline] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/standings', {
        params: { ...formData, offline },
      });
      setResult(response.data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Error fetching data.');
    }
  };

  return (
    <div>
      <h1>Football Standings</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="league"
          placeholder="League"
          value={formData.league}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="team"
          placeholder="Team"
          value={formData.team}
          onChange={handleChange}
          required
        />
        <label>
          Offline Mode:
          <input
            type="checkbox"
            checked={offline}
            onChange={() => setOffline(!offline)}
          />
        </label>
        <button type="submit">Get Standings</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {result && (
        <div>
          <p>Country ID & Name: ({result.country_id}) - {result.country_name}</p>
          <p>League ID & Name: ({result.league_id}) - {result.league_name}</p>
          <p>Team ID & Name: ({result.team_id}) - {result.team_name}</p>
          <p>Overall League Position: {result.overall_league_position}</p>
        </div>
      )}
    </div>
  );
};

export default FootballForm;