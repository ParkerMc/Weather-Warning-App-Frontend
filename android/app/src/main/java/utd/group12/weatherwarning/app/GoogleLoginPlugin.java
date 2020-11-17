package utd.group12.weatherwarning.app;

import android.content.Intent;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.common.api.Scope;
import com.google.android.gms.tasks.Task;

@NativePlugin(requestCodes={GoogleLoginPlugin.RC_SIGN_IN})
public class GoogleLoginPlugin extends Plugin {
    static final int RC_SIGN_IN = 227;

    private void sendCodeToClient(GoogleSignInAccount account) {
        String code = account.getServerAuthCode();
        JSObject ret = new JSObject();
        ret.put("type", "START_GOOGLE_LOGIN");
        ret.put("payload", code);
        this.notifyListeners("redux", ret);
    }

    @PluginMethod
    public void displayLogin(PluginCall call){
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN).requestScopes(new Scope("https://www.googleapis.com/auth/userinfo.email")).requestServerAuthCode(call.getString("client_id")).build();
        GoogleSignInClient signInClient = GoogleSignIn.getClient(this.getContext(), gso);
        Intent signInIntent = signInClient.getSignInIntent();
        this.startActivityForResult(call, signInIntent, RC_SIGN_IN);
    }

    @Override
    protected void handleOnActivityResult(int requestCode, int resultCode, Intent data) {
        super.handleOnActivityResult(requestCode, resultCode, data);
        if(requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            try{
                GoogleSignInAccount account = task.getResult(ApiException.class);
                if(account != null) {
                    sendCodeToClient(account);
                }
            } catch (ApiException e) {
                // The ApiException status code indicates the detailed failure reason.
                // Please refer to the GoogleSignInStatusCodes class reference for more information.
                Log.w("GoogleLoginPlugin", "signInResult:failed code=" + e.getStatusCode());
            }
        }
    }

}
