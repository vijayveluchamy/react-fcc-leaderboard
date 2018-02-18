import React, { Component } from 'react';

const url = {
    recent: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
    alltime: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'
}

class CamperAvatar extends Component {
    render() {
        return (
            <span>
                <img src={this.props.src} className='camper-img' />
            </span>
        );
    }
}

class CamperProfile extends Component {
    render() {
        let profileLink = 'https://www.freecodecamp.org/' + this.props.name;
        return (
            
                <a
                    href={profileLink}
                    target='_blank'
                    className='profile-link'
                >
                    {this.props.name}
                </a>
            
        );
    }
}

class SortLink extends Component {
    render() {

        if (this.props.currentTimespan === this.props.timespan) {
            return <label>{this.props.text}</label>
        } else {
            return (
                <a
                    href='#'
                    onClick={this.props.onClick}
                >
                    {this.props.text}
                </a>
            )
        }

    }
}

export default class Leaderboard extends Component {

    constructor() {
        super();
        this.state = {
            timespan: 'recent',
            campers: []
        }
    }

    fetchCampers() {
        fetch(url[this.state.timespan])
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    campers: data
                });
            })
    }

    componentDidMount() {
        this.fetchCampers();
    }

    changeTimespan(newTimespan) {
        this.setState({
            timespan: newTimespan
        }, () => {
            this.fetchCampers();
        });
    }

    render() {
        return (
            <div className='container'>
                <div className='header'>
                    <label>freeCodeCamp Leaderboard</label>
                </div>
                <table>
                    <thead>
                        <tr className='odd table-header'>
                            <th>#</th>
                            <th>Avatar</th>
                            <th>Camper Name</th>
                            <th>
                                <SortLink
                                    currentTimespan={this.state.timespan}
                                    timespan='recent'
                                    text='Points taken in last 30 days'
                                    onClick={() => {
                                        this.changeTimespan('recent');
                                    }}
                                />
                            </th>
                            <th>
                                <SortLink
                                    currentTimespan={this.state.timespan}
                                    timespan='alltime'
                                    text='All time points'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.changeTimespan('alltime');
                                    }}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.campers.map((camper, index) => (
                                <tr
                                    key={camper.username}
                                    className={index % 2 === 0 ? 'even' : 'odd'}
                                >
                                    <td className='center'>{index + 1}</td>
                                    <td className='center'>
                                        <CamperAvatar src={camper.img} />
                                    </td>
                                    <td>
                                        <CamperProfile name={camper.username} />
                                    </td>
                                    <td className='center'>{camper.recent}</td>
                                    <td className='center'>{camper.alltime}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    };
}