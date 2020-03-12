import React, { useState, useEffect } from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import AuthData from "datatypes/AuthData";
import { useLocation } from 'react-router-dom';
import * as qs from 'query-string';
import axios, {AxiosError, AxiosResponse} from "axios";
import GlobalSettings from "../GlobalSettings";





/*import { OauthReceiver } from 'react-oauth-flow';
interface ResponseAndState {
  response : any;
  state : any;
}

interface RenderParams {
  processing : boolean,
  state : any;
  error : Error;
}

const handleSuccess = async (accessToken:any, ras: ResponseAndState) => {
  console.log('Successfully authorized');
  //await setProfileFromDropbox(accessToken);
  //await redirect(ras.state.from);
};

const handleError = (error:any) => {
  console.error('An error occured');
  console.error(error.message);
};
*/

//query parans: {code: string, state: string}


const OAuthRedirectEndpoint = () => {

  const [isCheckingQuery, setIsCheckingQuery] = useState(true);

  const [authData, setAuthData] = useState<AuthData>({
    code: "-",
    state: "-",
    access_token: "-"
  });
  
  const location = useLocation();
  const queryParams = qs.parse(location.search);

   
  const [isRequestingToken, setIsRequestingToken] = useState(false);
  const [tokenResponse, setTokenResponse] = useState<any>({
    "access_token_not_loaded" : "-"        
    });

  useEffect(() => {
    if (isCheckingQuery) {
      console.log("Checking query params for auth:", queryParams)

      if ('code' in queryParams && 'state' in queryParams) {
        let ad : AuthData = {
          code: queryParams['code'] as string,
          state: queryParams['state'] as string,
          access_token: authData.access_token
        };
        setAuthData(ad)
      }

      setIsCheckingQuery(false);
    }
    if (isRequestingToken) {
      console.log("Requesting Auth Token")
      axios.post('auth/token', {
        'grant_type': 'authorization_code',
        'state': authData.state,
        'code': authData.code,
        'redirect_uri': 'http://'+GlobalSettings.hostname+'/OAuthRedirectEndpoint'
      }, {
        auth: {
          'username': 'webshop-webclient',
          'password': 'supersecretpassword'
        }
      }).then((response : AxiosResponse) => {
        setIsRequestingToken(false);
        setTokenResponse(response);
        console.log("got token response:", response);
        let ad : AuthData = {
          code: authData.code,
          state: authData.state,
          access_token: response.data['access_token']
        };
        setAuthData(ad)
      }).catch((reason: AxiosError) => {
        setIsRequestingToken(false);
        console.log("fetch token error", reason);
        if (reason.response !== undefined && reason.response.status === 400) {
          // Handle 400
        } else {
          // Handle else
        }
        console.log(reason.message)
      });
    }
  }, [setTokenResponse, tokenResponse, isRequestingToken, setIsRequestingToken, isCheckingQuery, setIsCheckingQuery, authData, setAuthData, queryParams]);


  const handleRequestTokenClick = () => setIsRequestingToken(true);


  //setAuthData(authData);
  return (
      <Container>
        <Row>
          <Col sm={12}>
            DEBUG: code={authData.code}, STATE={authData.state}
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h2>Login (Got Code) successfully - Now retreiving access token</h2>
            Authorization Code Grant Type (Step 5)
        <br/>
        <br/>
        Use AJAX to fetch token:
        <Button
          variant="primary"
            type="submit"
          disabled={isRequestingToken}
          onClick={!isRequestingToken ? handleRequestTokenClick : () => {
          }}
        >
          {isRequestingToken ? 'Requesting Token...' : 'Request Token'}
        </Button>
          </Col>
        </Row>

        {/*
        <Row>
          <Col>
            <OauthReceiver
            tokenUrl="http://"+GlobalSettings.hostname+"/auth/token"
            clientId="webshop-webclient"
            clientSecret="secret"
            redirectUri="http://"+GlobalSettings.hostname+"/OAuthRedirectEndpoint"
            onAuthSuccess={handleSuccess}
            onAuthError={handleError}
            render={(rp:RenderParams) => (
              <div>
                {rp.processing && <p>Authorizing now...</p>}
                {rp.error && (
                  <p className="error">An error occured: {rp.error.message}</p>
                )}
              </div>
            )}
          />
          </Col>
                </Row>*/}
        <Row>
              <Col>
              Old version: manual button
                  <a href={"http://"+GlobalSettings.hostname+":9201/auth/token?grant_type=authorization_code&client_id=webshop-webclient&client_secret=secret&state="+authData.state+"&code="+authData.code+"&redirect_uri=http://"+GlobalSettings.hostname+"/OAuthRedirectEndpoint"}>
                    <Button variant="primary">Redirect</Button>
                  </a>
              </Col>
        </Row>
      </Container>
  );
}

export default OAuthRedirectEndpoint