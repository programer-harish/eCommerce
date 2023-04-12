import {useState} from 'react';
import ApiContext from './apiContext';

const ApiState = (props)=>{
    const host = "http://localhost:5000";

    const getProducts=async ()=>{
        const response = await fetch(`${host}/api/products`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const json = await response.json()
          setNotes(json)
    }
}