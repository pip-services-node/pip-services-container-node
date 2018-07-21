# IoC container for Pip.Services in Node.js Changelog

## <a name="3.0.0"></a> 3.0.0 (2018-08-12)

### Breaking Changes
* Moved Shutdown to pip-services-components 
* Moved Component to pip-services-components 

## <a name="2.5.0"></a> 2.5.0 (2018-05-14)

### Features
* Added Shutdown to simulate fatal errors in containers

## <a name="2.4.0"></a> 2.4.0 (2018-03-26)

### Features
* ContainerInfo was replaced with ContextInfo from pip-services-commons

## <a name="2.2.0"></a> 2.2.0 (2017-04-20)

### Features
* Migrated to pip-services-commons 2.4
* Implemented IOpenable interface in ManagedReferences 
* Added Component class

### Bug Fixes
* Removed exception when fail to start container is being closed

## <a name="2.1.4"></a> 2.1.4 (2017-04-18)

### Bug Fixes
* Fixed error handling in Container.open()

## <a name="2.1.3"></a> 2.1.3 (2017-04-12)

### Features
* **container** Now supports IConfigurable, IReferenceable, IUnreferenceable and IOpenable interfaces
* Added name and description to container constructor
* Now container info is defined automatically

### Bug Fixes
* Container start and stop methods were renamed to open and close

## <a name="2.1.0"></a> 2.1.0 (2017-04-11)

### Bug Fixes
* **config** Added parameterization
* ProcessContainer now supports command line parameters

## <a name="2.0.6"></a> 2.0.6 (2017-02-25)

### Bug Fixes
* Fixed reading ContainerInfo from config

## <a name="2.0.4"></a> 2.0.4 (2017-02-25)

### Features
* **build** Added default factories for ConfigReader, CredentialStore and Discovery components

### Bug Fixes
* Fixed Ctrl-C handling in ProcessContainer

## <a name="2.0.0"></a> 2.0.0 (2017-02-25)

### Breaking Changes
* Moved over **ManagedReferences** from **pip-services-commons**

## <a name="1.0.0"></a> 1.0.0 (2017-01-28)

Initial public release

### Features
* **build** Container default factory
* **config** Container configuration
* **info** Container information block
* **refer** Container references
* **process** Container system process

### Bug Fixes
No fixes in this version

