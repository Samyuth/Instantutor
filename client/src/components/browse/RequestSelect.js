import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getRequestHistory } from '../../actions/request'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import RequestItem from './RequestItem'

const RequestSelect = ({
    getRequestHistory,
    user,
    req_history = [],
    loading = true,
    match
}) => {
    useEffect(async () => {
        (await user) && getRequestHistory(user._id)
      }, [getRequestHistory, match.params.id, user])


    return (
        <div>
            <h1 className="large text-primary">
                Choose a Request
            </h1>
            <p className="lead">
                Choose which request you want help with
            </p>

            {
                loading
                    ? <Spinner />
                    : req_history === null ||
                        req_history === undefined ||
                        req_history.length < 1 ? (
                            <div>
                                <h1 className='large text-primary'>Oops!</h1>
                                <h1 className='text-primary'>
                                Looks like u did not post any requests yet...
                                </h1>
                            </div>
                        ) : (
                            <div className='request '>
                                {req_history.map((request) => (
                                    request !== null && request !== undefined
                                        ? <RequestItem key={request._id} peer_request={request} tutor={false} />
                                        : null
                                ))}
                            </div>
                        )
            }

            <Link
                to="browse"
                className="btn btn-dark"
            >
                Go Back
            </Link> 
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    req_history: state.user_requests.request_history,
    loading: state.user_requests.loading,
})

export default connect(mapStateToProps, { getRequestHistory })(RequestSelect)