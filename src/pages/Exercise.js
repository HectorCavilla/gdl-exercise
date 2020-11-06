import React, { Component } from 'react'
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Content from 'react-bulma-components/lib/components/content';
import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';
import Notification from 'react-bulma-components/lib/components/notification';
import Button from 'react-bulma-components/lib/components/button';
import { Field, Control, Input } from 'react-bulma-components/lib/components/form';
import Columns from 'react-bulma-components/lib/components/columns';


export class Exercise extends Component {
    state = {
        numbers : [],
        inputValue: "",
        belongs: {}
    }

    componentDidMount () {
        fetch(`https://fibonacciapi.herokuapp.com/fibonacci`)
            .then(res => res.json())
            .then(fib => { this.setState({ numbers: fib }) })
            .catch(error => console.log(error));
    }

    _checkNumber = (e) => {
        e.preventDefault()
        const number = this.state.inputValue
    
        fetch(`https://fibonacciapi.herokuapp.com/fibonacci/${number}`)
            .then(res => res.json())
            .then(response => {
                this.setState({ belongs: response })
        })
        
      }

    render (){
        var belongsToFib;
        if (Object.keys(this.state.belongs).length > 0) {
            belongsToFib = this.state.belongs.isFib ? <Notification color="success"><p>{this.state.belongs.number} Belongs to serie</p></Notification> : <Notification color="danger"><p>{this.state.belongs.number} Do not belongs to serie</p></Notification>;
        }

        return(
            <React.Fragment>
                <Heading>Fibonacci List</Heading>
                <Section>
                    <Content>
                        <Columns>
                        {
                            this.state.numbers.length === 0 ?
                            <p>No results</p>
                            :
                                (
                                    this.state.numbers.map((number, i) => (
                                        <Columns.Column size={1} key={i}>{number}</Columns.Column>
                                    ))
                                )
                        }
                        </Columns>
                    </Content>
                </Section>
                <Section>
                    <Hero className="HeroCheck">
                        <Hero.Body>
                            <Container>
                                <Heading subtitle size={3}>
                                    Verify number belongs to the series
                                </Heading>
                                <Columns>
                                    <Columns.Column size={12}>
                                        <form onSubmit={this._checkNumber}>
                                            <Columns>
                                                <Columns.Column size={8}>
                                                    <Field>
                                                        <Control>
                                                            <Input
                                                                name="name"
                                                                type="text"
                                                                value={this.state.inputValue}
                                                                onChange={e => {
                                                                    this.setState({inputValue: e.target.value})
                                                                }}
                                                            />
                                                        </Control>
                                                    </Field>
                                                </Columns.Column>
                                                <Columns.Column size={4}>
                                                    <Button.Group>
                                                        <Button fullwidth color="primary" >🔎</Button>
                                                    </Button.Group>
                                                </Columns.Column>
                                            </Columns>
                                        </form>
                                    </Columns.Column>
                                </Columns>
                                
                                { belongsToFib }
                                
                            </Container>
                        </Hero.Body>
                    </Hero>

                </Section>
            </React.Fragment>
        )
    }
}