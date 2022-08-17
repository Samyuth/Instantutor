import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getRequestHistory } from '../../actions/request'
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
                                        ? <RequestItem key={request._id} peer_request={request} />
                                        : null
                                ))}
                            </div>
                        )
        }
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    req_history: state.user_requests.request_history,
    loading: state.user_requests.loading,
})

export default connect(mapStateToProps, { getRequestHistory })(RequestSelect)