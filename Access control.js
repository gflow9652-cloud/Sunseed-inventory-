// 1. Initialize the Supabase Client
const SUPABASE_URL = 'https://fpixeqaspwjoyiapsdjp.superbase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_VnZQNUFELsE8iv5EqLPjkA_p3Nctopu';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// 2. Run the check as soon as the script loads (before the DOM fully renders to prevent flickering)
checkAccess();

async function checkAccess() {
    try {
        // Retrieve the current session data from Supabase
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
            // If there is an error or no user session exists, redirect to login
            console.log('Access denied. Redirecting to login...');
            window.location.href = '/index.html'; // Path to your login page
            return;
        }

        // Optional: If session exists, you can dynamically display the user's email in your dashboard header
        document.addEventListener('DOMContentLoaded', () => {
            const userInfoElement = document.querySelector('.user-info');
            if (userInfoElement && session.user) {
                userInfoElement.textContent = `Welcome, ${session.user.email}`;
            }
            
            // Attach logout listener to your logout button
            setupLogoutButton();
        });

    } catch (err) {
        console.error('Access control error:', err);
        window.location.href = '/index.html';
    }
}

// 3. Handle Dashboard Logout
function setupLogoutButton() {
    // Finds a link or button containing the text "Logout"
    const logoutBtn = Array.from(document.querySelectorAll('a, button')).find(
        el => el.textContent.trim().toLowerCase() === 'logout'
    );

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault(); // Stop standard link behavior
            
            const { error } = await supabase.auth.signOut();
            if (error) {
                alert('Error logging out: ' + error.message);
            } else {
                console.log('Logged out successfully.');
                window.location.href = '/index.html'; // Redirect to login
            }
        });
    }
          }
                  
