export default function PerfilPage() {
    return (
        <div>
            <header style={{ padding: 16, borderBottom: '1px solid #e5e7eb' }}>
                <h1>Perfil</h1>
                <p>Basic Next.js page</p>
            </header>

            <main style={{ padding: 16 }}>
                <section>
                    <h2>About</h2>
                    <p>Replace this content with your perfil details.</p>
                </section>

                <section style={{ marginTop: 16 }}>
                    <h2>Edit</h2>
                    <form>
                        <label>
                            Name
                            <input name="name" type="text" style={{ marginLeft: 8 }} />
                        </label>
                    </form>
                </section>
            </main>

            <footer style={{ padding: 16, borderTop: '1px solid #e5e7eb' }}>
                <small>&copy; {new Date().getFullYear()}</small>
            </footer>
        </div>
    );
}