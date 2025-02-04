"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface FileData {
  id: number;
  filename: string;
  status: string;
  processedLinks: number;
  uploadDate: string;
}

const FileList: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:9010/files');
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Archivos Subidos</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <p>Nombre: {file.filename}</p>
            <p>Estado: {file.status}</p>
            <p>Links Procesados: {file.processedLinks}</p>
            <p>Fecha de Subida: {file.uploadDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;