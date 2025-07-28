const DomainCard = ({ domain }) => {
  return (
    <div className="domain-card border p-4 rounded shadow-sm mb-4">
      <h3 className="font-bold text-lg mb-1">{domain.domainName}</h3>
      <p className="text-sm text-gray-600">Domain ID: {domain.domainId}</p>
      {domain.subdomains && (
        <ul className="list-disc pl-5 mt-2 text-sm text-gray-800">
          {domain.subdomains.map((sub) => (
            <li key={sub.subdomainId}>
              {sub.subdomainName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default DomainCard;
