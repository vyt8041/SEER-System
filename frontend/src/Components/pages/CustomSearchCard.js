import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import './CustomSearchCard.css';
import { useDispatch } from 'react-redux';
import { addLeft, addMiddle, addRight } from '../actions/index.js'
import { useHistory } from "react-router-dom";

function CustomSearchCard() {

  const history = useHistory();
  const dispatch = useDispatch();

  const [seMethods, setMethods] = useState([]);
  const [selectValue, setSelect] = useState('Select');
  const [operatorValue, setOperator] = useState('Operator');
  const [seValue, setSeValue] = useState('SE Method');
  
  useEffect(() => {
  axios.get('/methods')
          .then(response => {
              console.log(response.data)
              setMethods(response.data)
          })
  }, [])

  useEffect(() => {
    history.listen((location, action) => {
      console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
      console.log(`The last navigation action was ${action}`)
    })
  });

  const changeSelect = (e) => {
    e.preventDefault();
    setSelect(e.target.textContent)
    console.log(e.target.textContent)
    // props.changedSelectCallback(e.target.textContent);
    dispatch(addLeft(e.target.textContent))
  }

  const changeOperator = (e) => {
    e.preventDefault();
    setOperator(e.target.textContent)
    console.log(e.target.textContent)
    // props.changedOperatorCallback(e.target.textContent);
    dispatch(addMiddle(e.target.textContent))
  }

  const changeSeMethod = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    setSeValue(e.target.value)
    // props.changedSeMethodCallback(e.target.textContent);
    dispatch(addRight(e.target.textContent))
  }

  const displaySeMethods = (method, index) => {
      return (
        <div key={index}>
          {(method.name === 'SeMethod') ? method.seMethod.map((seList) => 
            <Dropdown.Item onClick={(e) => changeSeMethod(e)}>{seList}</Dropdown.Item>
          ) : null}
        </div>
      );
  }

  return (
    <div className="box">
      <Form>
        <Container>
          <Row>
            <Col md="auto">If</Col>
            <Col md="auto">
              <DropdownButton id="dropdown-basic-button" title={selectValue}>
                <Dropdown.Item onClick={(e) => changeSelect(e)}>SE Method</Dropdown.Item>
                <Dropdown.Item onClick={(e) => changeSelect(e)}>SE Methodology</Dropdown.Item>
                <Dropdown.Item onClick={(e) => changeSelect(e)}>Title</Dropdown.Item>
                <Dropdown.Item onClick={(e) => changeSelect(e)}>Author</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col md="auto">
              <DropdownButton id="dropdown-basic-button" title={operatorValue}>
                <Dropdown.Item eventKey="1" onClick={(e) => changeOperator(e)}>contains</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={(e) => changeOperator(e)}>does not contain</Dropdown.Item>
                {selectValue !== 'SE Method' && selectValue !== 'SE Methodology' ? <>
                  <Dropdown.Item eventKey="3" onClick={(e) => changeOperator(e)}>begins with</Dropdown.Item>
                  <Dropdown.Item eventKey="4" onClick={(e) => changeOperator(e)}>ends with</Dropdown.Item>
                  <Dropdown.Item eventKey="5" onClick={(e) => changeOperator(e)}>is equal</Dropdown.Item>
                  </>
                  : null}
              </DropdownButton>
            </Col>
            <Col md="auto">
            {selectValue !== 'Select' ?   
              selectValue === 'Author' || selectValue === 'Title'? 
              <Form>
              <Form.Control placeholder={`Enter ${selectValue}`} onChange={(e) => changeSeMethod(e)}/>
              </Form>
              : <DropdownButton id="dropdown-basic-button" title={selectValue}>
                 {seMethods.map(displaySeMethods)}
              </DropdownButton>       
            : null}
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );

};

export default CustomSearchCard;