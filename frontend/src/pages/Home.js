import { useEffect, useState } from "react";

// components
import DomainCard from "../components/DomainCard";

const Home = () => {
  const [domains, setDomains] = useState(null);

  useEffect(() => {
    const fetchDomains = async () => {
      const response = await fetch('/api/domains');
      const json = await response.json();

      if (response.ok) {
        setDomains(json);
      }
    };

    fetchDomains();
  }, []);

  
  return (
    <div className="home">
      <h2>ECC Domains</h2>
      <div className="domains">
        {domains && domains.map((domain) => (
          <DomainCard domain={domain} key={domain.domainId} />
        ))}
      </div>
    </div>
  );
};

export default Home;
