import React, {Component} from 'react'
import PageHeading from '../../common/components/PageHeading'
import {connect} from 'react-redux'
import OrderGrid from '../../common/components/OrderGrid'
import OrderCard from '../../common/components/OrderCard'
import OrderFilter from '../../common/components/OrderFilter'

const wasImage = require('../../../img/orderTypes/websphere.png')
const jbossImage = require('../../../img/orderTypes/jboss.png')
const wildflyImage = require('../../../img/orderTypes/wildfly.png')
const libertyImage = require('../../../img/orderTypes/liberty.png')
const securityImage = require('../../../img/orderTypes/security.png')
const openamImage = require('../../../img/orderTypes/openam.png')
const redhatImage = require('../../../img/orderTypes/redhat.png')
const containerlinuxImage = require('../../../img/orderTypes/containerlinux.png')
const dbImage = require('../../../img/orderTypes/oracle.png')
const windowsImage = require('../../../img/orderTypes/windows.png')
const bigipImage = require('../../../img/orderTypes/big-ip.png')
const mqImage = require('../../../img/orderTypes/mq.png')
const developertoolsImage = require('../../../img/orderTypes/devtools.png')
const iappImage = require('../../../img/orderTypes/devtools-iapp.png')


export class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderTypes
        }
    }

    filterString(filter) {
        const filteredOrders = orderTypes.filter((orderType) => {
            return orderType.tags.filter((tag) => {
                return tag.match(filter.toLowerCase())
            }).length > 0
        })
        this.setState({orderTypes: filteredOrders})
    }
    summarize(a,b){
        return a+b
    }

    render() {
        return (
            <div>
                <PageHeading icon='fa-plus' heading='Create new order' description=''/>
                <OrderFilter onChange={(e) => this.filterString(e)}/>
                <OrderGrid>
                    {this.state.orderTypes.map((orderType, i) => {
                        const {title, description, image, tags, url} = orderType
                        return <OrderCard key={i} label={title} description={description} image={image} tags={tags} url={url}/>
                    })
                    }

                </OrderGrid>
            </div>
        )
    }
}

const orderTypes = [
    {
        title: 'IApp Tools',
        description: 'Available via VPN',
        image: iappImage,
        tags: ['developer', 'tools', 'iapp', 'jenkins', 'vpn'],
        url: '/create/iapptools'
    },
    {
        title: 'Devillo Tools',
        description: 'Jenkins etc. in Devillo',
        image: developertoolsImage,
        tags: ['developer', 'tools', 'devillo', 'jenkins'],
        url: '/create/developertools'
    },
    {
        title: 'WebSphere MQ',
        description: 'Channel',
        image: mqImage,
        tags: ['mq', 'channel', 'websphere', 'ibm'],
        url: '/create/ws-channel'
    },
    {
        title: 'WebSphere MQ',
        description: 'Topic',
        image: mqImage,
        tags: ['mq', 'topic', 'websphere', 'ibm'],
        url: '/create/ws-topic'
    },
    {
        title: 'WebSphere MQ',
        description: 'Queue',
        image: mqImage,
        tags: ['mq', 'queue', 'websphere', 'ibm'],
        url: '/create/ws-queue'
    },
    {
        title: 'BIG-IP',
        description: 'Load Balancer Config',
        image: bigipImage,
        tags: ['loadbalancer', 'big-ip', 'f5'],
        url: '/create/bigip'
    },
    {
        title: 'Windows',
        description: 'server',
        image: windowsImage,
        tags: ['server', 'node', 'windows', 'node'],
        url: '/create/windows'
    },
    {
        title: 'Oracle',
        description: 'database',
        image: dbImage,
        tags: ['database', 'db', 'oracle'],
        url: '/create/oracle'
    },
    {
        title: 'Container Linux',
        description: 'CoreOS',
        image: containerlinuxImage,
        tags: ['linux', 'server', 'core os', 'container', 'node'],
        url: '/create/coreos'
    },
    {
        title: 'Red Hat',
        description: 'Linux',
        image: redhatImage,
        tags: ['linux', 'server', 'red hat', 'node'],
        url: '/create/redhat'
    },
    {
        title: 'OpenAM',
        description: 'proxy',
        image: openamImage,
        tags: ['openam', 'server', 'security', 'proxy'],
        url: '/create/openam-proxy'
    },
    {
        title: 'OpenAM',
        description: 'server',
        image: openamImage,
        tags: ['openam', 'server', 'security'],
        url: '/create/openam-server'
    },
    {
        title: 'Certificate',
        description: 'for Service user',
        image: securityImage,
        tags: ['certificate', 'pki', 'credential', 'ad'],
        url: '/create/service-cerficate'
    },
    {
        title: 'Credentials',
        description: 'for Service user',
        image: securityImage,
        tags: ['service', 'user', 'credential', 'ad'],
        url: '/create/service-user'
    },
    {
        title: 'Liberty',
        description: 'Application server',
        image: libertyImage,
        tags: ['server', 'node', 'was', 'liberty', 'application', 'websphere'],
        url: '/create/liberty-node'
    },
    {
        title: 'WildFly',
        description: 'Application server',
        image: wildflyImage,
        tags: ['server', 'node', 'wildfly', 'application'],
        url: '/create/wildfly-node'
    },
    {
        title: 'JBoss',
        description: 'Application server',
        image: jbossImage,
        tags: ['server', 'node', 'jboss', 'application'],
        url: '/create/jboss-node'
    },
    {
        title: 'WAS',
        description: 'Node',
        image: wasImage,
        tags: ['server', 'node', 'was', 'websphere'],
        url: '/create/was-node'
    },
    {
        title: 'WAS',
        description: 'Deployment Manager',
        image: wasImage,
        tags: ['server', 'deployment manager', 'was', 'websphere'],
        url: '/create/was-dmgr'
    },
    {
        title: 'BPM',
        description: 'Node',
        image: wasImage,
        tags: ['server', 'node', 'was', 'websphere'],
        url: '/create/bpm-node'
    },
    {
        title: 'BPM',
        description: 'Deployment Manager',
        image: wasImage,
        tags: ['server', 'deployment manager', 'was', 'websphere'],
        url: '/create/bpm-dmgr'
    }
]
Create.propTypes = {}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Create)