import React, { useState, useEffect } from 'react'

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: 'Residential',
    date: '',
    time: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    services: false,
    projects: false,
    estimate: false,
    contact: false,
  })

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.2 }
    )
    document.querySelectorAll('section').forEach(sec => observer.observe(sec))
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    Object.entries(form).forEach(([k, v]) => formData.append(k, v))

    fetch('https://formsubmit.co/YOUR_EMAIL_HERE', {
      method: 'POST',
      body: formData,
    })
      .then(() => setSubmitted(true))
      .catch(() =>
        alert('Submission failed. Please email us at hello@jgnora.com')
      )
  }

  const sectionClass = id =>
    `transition-all duration-1000 ${
      visibleSections[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`

  return (
    <div className="min-h-screen bg-white text-slate-700">
      {/* Header */}
      <header className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
