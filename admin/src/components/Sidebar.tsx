import { NavLink } from 'react-router-dom'

const links = [
  { to: '/admin/pricing', label: 'Pricing' },
  { to: '/admin/blog', label: 'Blog' },
  { to: '/admin/content', label: 'Content Blocks' },
  { to: '/admin/contacts', label: 'Contacts' },
  { to: '/admin/bookings', label: 'Bookings' },
  { to: '/admin/users', label: 'Users' }
]

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="brand">ASR Visuals Admin</div>
      <nav className="nav-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="pill">Secure admin access</div>
    </aside>
  )
}

export default Sidebar
