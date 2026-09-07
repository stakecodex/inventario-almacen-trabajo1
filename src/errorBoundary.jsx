import { Component } from "react"

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { error: null }
    }

    static getDerivedStateFromError(error) {
        return { error }
    }

    componentDidCatch(error, info) {
        console.error("Error atrapado por ErrorBoundary:", error, info)
    }

    render() {
        if (this.state.error) {
            return (
                <div style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    background: "#0d0f12",
                    color: "#f2f2f0",
                    fontFamily: "Inter, sans-serif",
                    textAlign: "center",
                    padding: "24px",
                }}>
                    <h1 style={{ margin: 0 }}>Ocurrió un error inesperado</h1>
                    <p style={{ color: "#9a9fa8", margin: 0 }}>
                        Recarga la página para continuar usando el inventario.
                    </p>
                </div>
            )
        }

        return this.props.children
    }
}
