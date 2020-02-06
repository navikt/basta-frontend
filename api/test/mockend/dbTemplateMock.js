exports.getTemplates = () => {
  return (req, res) => {
    console.log('req.params', req.query)

    if (req.query.environmentClass === 'u') {
      res.status(400).send('No template available for envclass u')
    } else {
      res.status(200).send([
        {
          uri: '/em/cloud/dbaas/pluggabledbplatformtemplate/23',
          description: 'Standard Q Oracle Pluggable Database, Oracle Dataguard, No Backup',
          name: 'q_st_rhel_fss',
          zoneuri: '/em/cloud/dbaas/zone/3D93576CC488F023B371F9D56F8FF3FE'
        },
        {
          uri: '/em/cloud/dbaas/pluggabledbplatformtemplate/143',
          description: 'Standard Preprod Oracle Pluggable Database, Oracle 19, No Backup',
          name: 'q_o19_st_rhel_fss',
          zoneuri: '/em/cloud/dbaas/zone/DA5EABD9502AEDD3CB01FAEC7C56C94C'
        },
        {
          uri: '/em/cloud/dbaas/pluggabledbplatformtemplate/101',
          description: 'Standard Preprod Oracle Pluggable Database, Oracle 18, No Backup',
          name: 'q_o18_st_rhel_fss',
          zoneuri: '/em/cloud/dbaas/zone/DA5EABD9502AEDD3CB01FAEC7C56C94C'
        }
      ])
    }
  }
}
