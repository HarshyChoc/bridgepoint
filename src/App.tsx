import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppStateProvider } from '@/state/AppStateContext'
import { ToastProvider } from '@/components/ui/Toast'

import { MarketingLayout } from '@/pages/marketing/MarketingLayout'
import { Home } from '@/pages/marketing/Home'
import { Platform } from '@/pages/marketing/Platform'
import { Individuals } from '@/pages/marketing/Individuals'
import { Organizations } from '@/pages/marketing/Organizations'
import { Landlords } from '@/pages/marketing/Landlords'
import { Government } from '@/pages/marketing/Government'
import { About } from '@/pages/marketing/About'
import { Roadmap } from '@/pages/marketing/Roadmap'
import { Contact } from '@/pages/marketing/Contact'
import { NotFound } from '@/pages/NotFound'
import { SignIn } from '@/pages/SignIn'
import { Intake } from '@/features/intake/Intake'

import { IndividualPortal } from '@/portals/individual/IndividualPortal'
import { MyPlan } from '@/portals/individual/MyPlan'
import { Resources } from '@/portals/individual/Resources'
import { ResourceDetail } from '@/portals/individual/ResourceDetail'
import { Saved } from '@/portals/individual/Saved'
import { Appointments } from '@/portals/individual/Appointments'
import { Documents } from '@/portals/individual/Documents'
import { Messages } from '@/portals/individual/Messages'

import { AdvocatePortal } from '@/portals/advocate/AdvocatePortal'
import { AdvocateDashboard } from '@/portals/advocate/Dashboard'
import { Caseload } from '@/portals/advocate/Caseload'
import { ClientCase } from '@/portals/advocate/ClientCase'
import { ReferralsBoard } from '@/portals/advocate/ReferralsBoard'
import { Tasks } from '@/portals/advocate/Tasks'
import { DocumentCenter } from '@/portals/advocate/DocumentCenter'
import { Partners } from '@/portals/advocate/Partners'
import { AdvocateAnalytics } from '@/portals/advocate/Analytics'

import { LandlordPortal } from '@/portals/landlord/LandlordPortal'
import { Properties } from '@/portals/landlord/Properties'
import { LandlordReferrals } from '@/portals/landlord/LandlordReferrals'
import { Inspections } from '@/portals/landlord/Inspections'
import { LandlordDocuments } from '@/portals/landlord/LandlordDocuments'
import { Payments } from '@/portals/landlord/Payments'
import { LandlordMessages } from '@/portals/landlord/LandlordMessages'

import { TenantPortal } from '@/portals/tenant/TenantPortal'
import { TenantHome } from '@/portals/tenant/TenantHome'
import { MyLease } from '@/portals/tenant/MyLease'
import { Rent } from '@/portals/tenant/Rent'
import { Learn } from '@/portals/tenant/Learn'
import { Support } from '@/portals/tenant/Support'
import { Community } from '@/portals/tenant/Community'

import { GovernmentPortal } from '@/portals/government/GovernmentPortal'
import { StatewideOverview } from '@/portals/government/StatewideOverview'
import { Counties } from '@/portals/government/Counties'
import { Providers } from '@/portals/government/Providers'
import { HousingSupply } from '@/portals/government/HousingSupply'
import { GrantCompliance } from '@/portals/government/GrantCompliance'
import { ServiceGapsView } from '@/portals/government/ServiceGaps'
import { Exports } from '@/portals/government/Exports'

export function App() {
  return (
    <AppStateProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MarketingLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/platform" element={<Platform />} />
              <Route path="/individuals" element={<Individuals />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/landlords" element={<Landlords />} />
              <Route path="/government" element={<Government />} />
              <Route path="/about" element={<About />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            <Route path="/signin" element={<SignIn />} />
            <Route path="/start" element={<Intake />} />

            <Route path="/app" element={<IndividualPortal />}>
              <Route index element={<MyPlan />} />
              <Route path="resources" element={<Resources />} />
              <Route path="resources/:resourceId" element={<ResourceDetail />} />
              <Route path="saved" element={<Saved />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="documents" element={<Documents />} />
              <Route path="messages" element={<Messages />} />
            </Route>

            <Route path="/advocate" element={<AdvocatePortal />}>
              <Route index element={<AdvocateDashboard />} />
              <Route path="caseload" element={<Caseload />} />
              <Route path="caseload/:clientId" element={<ClientCase />} />
              <Route path="referrals" element={<ReferralsBoard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="documents" element={<DocumentCenter />} />
              <Route path="partners" element={<Partners />} />
              <Route path="analytics" element={<AdvocateAnalytics />} />
            </Route>

            <Route path="/landlord" element={<LandlordPortal />}>
              <Route index element={<Properties />} />
              <Route path="referrals" element={<LandlordReferrals />} />
              <Route path="inspections" element={<Inspections />} />
              <Route path="documents" element={<LandlordDocuments />} />
              <Route path="payments" element={<Payments />} />
              <Route path="messages" element={<LandlordMessages />} />
            </Route>

            <Route path="/tenant" element={<TenantPortal />}>
              <Route index element={<TenantHome />} />
              <Route path="lease" element={<MyLease />} />
              <Route path="rent" element={<Rent />} />
              <Route path="learn" element={<Learn />} />
              <Route path="support" element={<Support />} />
              <Route path="community" element={<Community />} />
            </Route>

            <Route path="/admin" element={<GovernmentPortal />}>
              <Route index element={<StatewideOverview />} />
              <Route path="counties" element={<Counties />} />
              <Route path="providers" element={<Providers />} />
              <Route path="housing-supply" element={<HousingSupply />} />
              <Route path="grants" element={<GrantCompliance />} />
              <Route path="service-gaps" element={<ServiceGapsView />} />
              <Route path="exports" element={<Exports />} />
            </Route>

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AppStateProvider>
  )
}
