import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { toast } from 'react-toastify'

import { db } from "../firebase";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const addOrEditLink = async (linkobject) => {
   if (currentId === "") {
    await db.collection("links").doc().set(linkobject);
    toast('New Link Add', {
        type: 'success',
        autoClose: 2000
    });
   } else {
       await db.collection('links').doc(currentId).update(linkobject);
       toast('Link Update', {
        type: 'info',
        autoClose: 2000
    });
    setCurrentId('');
   }
  };

  const onDeleteLink = async (id) => {
      if (window.confirm('¿Seguro de Eliminar el siguiente enlace?')) {
        await db.collection('links').doc(id).delete();
        toast('Link Eliminated', {
            type: 'error',
            autoClose: 2000
        })
      }
  };

  const getLinks = () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div>
      <div className="col-md-4 p-2">
        <LinkForm {...{addOrEditLink, currentId, links}} />
      </div>
      <div className="col-md-8 p-2">
        {links.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noreferrer">
                Go to Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
